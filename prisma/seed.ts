import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const SPRITE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

const pokemonData = [
  {
    id: 1,
    name: 'bulbasaur',
    types: ['grass', 'poison'],
    sprite: `${SPRITE_BASE}/1.png`,
  },
  {
    id: 2,
    name: 'ivysaur',
    types: ['grass', 'poison'],
    sprite: `${SPRITE_BASE}/2.png`,
  },
  {
    id: 3,
    name: 'venusaur',
    types: ['grass', 'poison'],
    sprite: `${SPRITE_BASE}/3.png`,
  },
  {
    id: 4,
    name: 'charmander',
    types: ['fire'],
    sprite: `${SPRITE_BASE}/4.png`,
  },
  {
    id: 5,
    name: 'charmeleon',
    types: ['fire'],
    sprite: `${SPRITE_BASE}/5.png`,
  },
  {
    id: 6,
    name: 'charizard',
    types: ['fire', 'flying'],
    sprite: `${SPRITE_BASE}/6.png`,
  },
  {
    id: 7,
    name: 'squirtle',
    types: ['water'],
    sprite: `${SPRITE_BASE}/7.png`,
  },
  {
    id: 8,
    name: 'wartortle',
    types: ['water'],
    sprite: `${SPRITE_BASE}/8.png`,
  },
  {
    id: 9,
    name: 'blastoise',
    types: ['water'],
    sprite: `${SPRITE_BASE}/9.png`,
  },
  {
    id: 25,
    name: 'pikachu',
    types: ['electric'],
    sprite: `${SPRITE_BASE}/25.png`,
  },
  {
    id: 26,
    name: 'raichu',
    types: ['electric'],
    sprite: `${SPRITE_BASE}/26.png`,
  },
  {
    id: 39,
    name: 'jigglypuff',
    types: ['normal', 'fairy'],
    sprite: `${SPRITE_BASE}/39.png`,
  },
  {
    id: 52,
    name: 'meowth',
    types: ['normal'],
    sprite: `${SPRITE_BASE}/52.png`,
  },
  {
    id: 54,
    name: 'psyduck',
    types: ['water'],
    sprite: `${SPRITE_BASE}/54.png`,
  },
  {
    id: 63,
    name: 'abra',
    types: ['psychic'],
    sprite: `${SPRITE_BASE}/63.png`,
  },
  {
    id: 66,
    name: 'machop',
    types: ['fighting'],
    sprite: `${SPRITE_BASE}/66.png`,
  },
  {
    id: 74,
    name: 'geodude',
    types: ['rock', 'ground'],
    sprite: `${SPRITE_BASE}/74.png`,
  },
  {
    id: 92,
    name: 'gastly',
    types: ['ghost', 'poison'],
    sprite: `${SPRITE_BASE}/92.png`,
  },
  {
    id: 94,
    name: 'gengar',
    types: ['ghost', 'poison'],
    sprite: `${SPRITE_BASE}/94.png`,
  },
  {
    id: 113,
    name: 'chansey',
    types: ['normal'],
    sprite: `${SPRITE_BASE}/113.png`,
  },
  {
    id: 116,
    name: 'horsea',
    types: ['water'],
    sprite: `${SPRITE_BASE}/116.png`,
  },
  {
    id: 129,
    name: 'magikarp',
    types: ['water'],
    sprite: `${SPRITE_BASE}/129.png`,
  },
  {
    id: 130,
    name: 'gyarados',
    types: ['water', 'flying'],
    sprite: `${SPRITE_BASE}/130.png`,
  },
  {
    id: 131,
    name: 'lapras',
    types: ['water', 'ice'],
    sprite: `${SPRITE_BASE}/131.png`,
  },
  {
    id: 133,
    name: 'eevee',
    types: ['normal'],
    sprite: `${SPRITE_BASE}/133.png`,
  },
  {
    id: 134,
    name: 'vaporeon',
    types: ['water'],
    sprite: `${SPRITE_BASE}/134.png`,
  },
  {
    id: 135,
    name: 'jolteon',
    types: ['electric'],
    sprite: `${SPRITE_BASE}/135.png`,
  },
  {
    id: 136,
    name: 'flareon',
    types: ['fire'],
    sprite: `${SPRITE_BASE}/136.png`,
  },
  {
    id: 143,
    name: 'snorlax',
    types: ['normal'],
    sprite: `${SPRITE_BASE}/143.png`,
  },
  {
    id: 147,
    name: 'dratini',
    types: ['dragon'],
    sprite: `${SPRITE_BASE}/147.png`,
  },
  {
    id: 148,
    name: 'dragonair',
    types: ['dragon'],
    sprite: `${SPRITE_BASE}/148.png`,
  },
  {
    id: 149,
    name: 'dragonite',
    types: ['dragon', 'flying'],
    sprite: `${SPRITE_BASE}/149.png`,
  },
  {
    id: 150,
    name: 'mewtwo',
    types: ['psychic'],
    sprite: `${SPRITE_BASE}/150.png`,
  },
  {
    id: 151,
    name: 'mew',
    types: ['psychic'],
    sprite: `${SPRITE_BASE}/151.png`,
  },
]

async function main() {
  console.log('🌱 Seeding database...')

  for (const pokemon of pokemonData) {
    await prisma.pokemon.upsert({
      where: { name: pokemon.name },
      update: {},
      create: {
        id: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        sprite: pokemon.sprite,
      },
    })
    console.log(`  ✅ ${pokemon.name}`)
  }

  console.log(`\n🎉 Seeded ${pokemonData.length} Pokémon successfully!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
