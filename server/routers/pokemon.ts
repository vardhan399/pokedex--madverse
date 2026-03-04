import { TRPCError } from '@trpc/server'
import { z } from 'zod'
import { createTRPCRouter, tracedProcedure } from '../trpc'

export const POKEMON_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const

export type PokemonType = (typeof POKEMON_TYPES)[number]

export const pokemonRouter = createTRPCRouter({
  /**
   * Part 1: Get a single Pokémon by name
   */
  getPokemon: tracedProcedure
    .input(
      z.object({
        name: z.string().min(1, 'Name is required').toLowerCase(),
      })
    )
    .query(async ({ ctx, input }) => {
      const pokemon = await ctx.prisma.pokemon.findUnique({
        where: { name: input.name.toLowerCase() },
      })

      if (!pokemon) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Pokémon "${input.name}" not found in the Pokédex.`,
        })
      }

      return pokemon
    }),

  /**
   * Part 2: Get multiple Pokémon by names
   */
  getPokemonByNames: tracedProcedure
    .input(
      z.object({
        names: z
          .array(z.string().min(1))
          .min(1, 'At least one name is required')
          .max(20, 'Maximum 20 Pokémon at once'),
        limit: z.number().int().min(1).max(50).default(10),
        offset: z.number().int().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const normalizedNames = input.names.map((n) => n.trim().toLowerCase())

      const [pokemon, total] = await Promise.all([
        ctx.prisma.pokemon.findMany({
          where: { name: { in: normalizedNames } },
          orderBy: { id: 'asc' },
          take: input.limit,
          skip: input.offset,
        }),
        ctx.prisma.pokemon.count({
          where: { name: { in: normalizedNames } },
        }),
      ])

      return {
        pokemon,
        total,
        limit: input.limit,
        offset: input.offset,
        hasMore: input.offset + input.limit < total,
      }
    }),

  /**
   * Part 3: Get Pokémon filtered by type (or all if type is undefined)
   */
  getPokemonByType: tracedProcedure
    .input(
      z.object({
        type: z.string().optional(),
        limit: z.number().int().min(1).max(50).default(12),
        offset: z.number().int().min(0).default(0),
      })
    )
    .query(async ({ ctx, input }) => {
      const where = input.type
        ? { types: { has: input.type } }
        : {}

      const [pokemon, total] = await Promise.all([
        ctx.prisma.pokemon.findMany({
          where,
          orderBy: { id: 'asc' },
          take: input.limit,
          skip: input.offset,
        }),
        ctx.prisma.pokemon.count({ where }),
      ])

      return {
        pokemon,
        total,
        limit: input.limit,
        offset: input.offset,
        hasMore: input.offset + input.limit < total,
      }
    }),

  /**
   * Get all available types from the database
   */
  getAvailableTypes: tracedProcedure.query(async ({ ctx }) => {
    const pokemon = await ctx.prisma.pokemon.findMany({
      select: { types: true },
    })

    const typesSet = new Set<string>()
    for (const p of pokemon) {
      for (const type of p.types) {
        typesSet.add(type)
      }
    }

    return Array.from(typesSet).sort()
  }),
})
