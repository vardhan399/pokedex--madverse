'use client'

import { TableRow, TableCell, Chip, Box, Typography, Avatar } from '@mui/material'
import { type Pokemon, TYPE_COLORS } from '@/types/pokemon'

interface PokemonRowProps {
  pokemon: Pokemon
}

export function PokemonRow({ pokemon }: PokemonRowProps) {
  const formattedName =
    pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)

  return (
    <TableRow
      sx={{
        cursor: 'default',
        transition: 'background-color 0.15s ease',
      }}
    >
      {/* ID */}
      <TableCell>
        <Typography
          variant="body2"
          sx={{
            fontFamily: 'monospace',
            color: 'text.secondary',
            fontWeight: 600,
            fontSize: '0.8rem',
          }}
        >
          #{String(pokemon.id).padStart(3, '0')}
        </Typography>
      </TableCell>

      {/* Sprite */}
      <TableCell>
        <Avatar
          src={pokemon.sprite}
          alt={formattedName}
          variant="square"
          sx={{
            width: 56,
            height: 56,
            imageRendering: 'pixelated',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            bgcolor: 'transparent',
            '& img': {
              objectFit: 'contain',
            },
          }}
          imgProps={{
            loading: 'lazy',
          }}
        />
      </TableCell>

      {/* Name */}
      <TableCell>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            letterSpacing: '0.01em',
          }}
        >
          {formattedName}
        </Typography>
      </TableCell>

      {/* Types */}
      <TableCell>
        <Box sx={{ display: 'flex', gap: 0.75, flexWrap: 'wrap' }}>
          {pokemon.types.map((type) => (
            <Chip
              key={type}
              label={type}
              size="small"
              sx={{
                backgroundColor: TYPE_COLORS[type] ?? '#777',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.68rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                height: 22,
                boxShadow: `0 2px 8px ${TYPE_COLORS[type] ?? '#777'}66`,
              }}
            />
          ))}
        </Box>
      </TableCell>
    </TableRow>
  )
}
