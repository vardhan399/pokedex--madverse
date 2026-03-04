import { createTRPCRouter } from '../trpc'
import { pokemonRouter } from './pokemon'

export const appRouter = createTRPCRouter({
  pokemon: pokemonRouter,
})

export type AppRouter = typeof appRouter
