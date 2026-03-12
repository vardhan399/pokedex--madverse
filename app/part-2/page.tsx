'use client'

import { useState } from 'react'
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Chip,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { trpc } from '@/lib/trpc'
import { PokedexTable } from '@/components/PokedexTable'

const EXAMPLE_SEARCHES = [
  'pikachu, charizard, mewtwo',
  'bulbasaur, ivysaur, venusaur',
  'eevee, vaporeon, jolteon, flareon',
]

type PokemonResponse = {
  total: number
  pokemon: any[]
}

export default function Part2Page() {
  const [inputValue, setInputValue] = useState('')
  const [searchNames, setSearchNames] = useState<string[] | null>(null)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data, isLoading, error } = trpc.pokemon.getPokemonByNames.useQuery(
    {
      names: searchNames ?? [],
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    },
    {
      enabled: !!searchNames && searchNames.length > 0,
      staleTime: 5 * 60 * 1000,
      retry: false,
      keepPreviousData: true,
    } as Parameters<typeof trpc.pokemon.getPokemonByNames.useQuery>[1]
  )

  const typedData = data as PokemonResponse | undefined

  const handleSearch = () => {
    const names = inputValue
      .split(',')
      .map((n) => n.trim().toLowerCase())
      .filter(Boolean)

    if (names.length > 0) {
      setSearchNames(names)
      setPage(0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  const handleExampleClick = (example: string) => {
    setInputValue(example)

    const names = example
      .split(',')
      .map((n) => n.trim().toLowerCase())
      .filter(Boolean)

    setSearchNames(names)
    setPage(0)
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="caption"
          sx={{
            color: '#4ECDC4',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}
        >
          Part 02
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
          Multi-Pokémon Fetch
        </Typography>

        <Typography variant="body1" color="text.secondary">
          Enter multiple Pokémon names separated by commas to fetch and display
          them in a sortable table.
        </Typography>
      </Box>

      <Paper
        sx={{
          p: 3,
          mb: 4,
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            label="Pokémon Names (comma-separated)"
            placeholder="e.g. pikachu, charizard, mewtwo"
            variant="outlined"
            sx={{ flex: '1 1 300px' }}
            helperText="Enter names separated by commas"
          />

          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={!inputValue.trim() || isLoading}
            sx={{ mt: 0.5, height: 56 }}
          >
            {isLoading ? 'Fetching…' : 'Fetch'}
          </Button>
        </Box>

        <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap', alignItems: 'center' }}>
          <Typography variant="caption" color="text.secondary" sx={{ mr: 0.5 }}>
            Try:
          </Typography>

          {EXAMPLE_SEARCHES.map((ex) => (
            <Chip
              key={ex}
              label={ex}
              size="small"
              onClick={() => handleExampleClick(ex)}
              clickable
              sx={{
                fontSize: '0.7rem',
                bgcolor: 'rgba(78,205,196,0.1)',
                border: '1px solid rgba(78,205,196,0.3)',
                color: '#4ECDC4',
                '&:hover': {
                  bgcolor: 'rgba(78,205,196,0.2)',
                },
              }}
            />
          ))}
        </Box>
      </Paper>

      {error && (
        <Alert severity="error" sx={{ borderRadius: 2, mb: 3 }}>
          {error.message}
        </Alert>
      )}

      {(searchNames || isLoading) && (
        <Box>
          {typedData && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Found {typedData.total} of {searchNames?.length ?? 0} requested Pokémon
            </Typography>
          )}

          <PokedexTable
            pokemonList={typedData?.pokemon ?? []}
            total={typedData?.total ?? 0}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={(newPage) => setPage(newPage)}
            onRowsPerPageChange={(newRows) => {
              setRowsPerPage(newRows)
              setPage(0)
            }}
            isLoading={isLoading}
          />
        </Box>
      )}

      {!searchNames && !isLoading && (
        <Box
          sx={{
            textAlign: 'center',
            py: 10,
            border: '2px dashed rgba(255,255,255,0.06)',
            borderRadius: 3,
          }}
        >
          <Typography sx={{ fontSize: '3rem', mb: 2 }}>📋</Typography>
          <Typography variant="body1" color="text.secondary">
            Enter Pokémon names above or click an example to get started
          </Typography>
        </Box>
      )}
    </Container>
  )
}