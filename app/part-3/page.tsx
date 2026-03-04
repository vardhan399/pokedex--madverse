'use client'

import { Container, Box, Typography } from '@mui/material'
import { FilterablePokedexTable } from '@/components/FilterablePokedexTable'

export default function Part3Page() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="caption"
          sx={{
            color: '#A98FF3',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}
        >
          Part 03
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mt: 0.5,
            mb: 1.5,
            fontSize: { xs: '1.8rem', md: '2.4rem' },
          }}
        >
          Filter by Type
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse the full Pokédex and filter by elemental type. Selecting no
          type shows all Pokémon.
        </Typography>
      </Box>

      <FilterablePokedexTable />
    </Container>
  )
}
