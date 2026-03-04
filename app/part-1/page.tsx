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
  Skeleton,
  Chip,
  Divider,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { trpc } from '@/lib/trpc'
import { TYPE_COLORS } from '@/types/pokemon'

export default function Part1Page() {
  const [inputValue, setInputValue] = useState('')
  const [searchName, setSearchName] = useState<string | null>(null)

  const { data, isLoading, error, isFetching } =
    trpc.pokemon.getPokemon.useQuery(
      { name: searchName ?? '' },
      {
        enabled: !!searchName,
        staleTime: 5 * 60 * 1000,
        retry: false,
      }
    )

  const handleSearch = () => {
    const trimmed = inputValue.trim().toLowerCase()
    if (trimmed) {
      setSearchName(trimmed)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch()
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 4, md: 8 } }}>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography
          variant="caption"
          sx={{
            color: 'primary.main',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            fontSize: '0.7rem',
          }}
        >
          Part 01
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, mt: 0.5, mb: 1.5, fontSize: { xs: '1.8rem', md: '2.4rem' } }}
        >
          Single Pokémon Lookup
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search for any Pokémon by name to retrieve its details from the
          database.
        </Typography>
      </Box>

      {/* Search Form */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'flex-start',
          }}
        >
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            label="Pokémon Name"
            placeholder="e.g. pikachu, charizard..."
            variant="outlined"
            sx={{ flex: '1 1 220px' }}
            helperText="Enter a Pokémon name and press Search or Enter"
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            disabled={!inputValue.trim() || isLoading}
            sx={{ mt: 0.5, height: 56 }}
          >
            {isLoading || isFetching ? 'Searching…' : 'Search'}
          </Button>
        </Box>
      </Paper>

      {/* Results */}
      {isLoading && (
        <Paper
          sx={{ p: 3, border: '1px solid rgba(255,255,255,0.08)', borderRadius: 3 }}
        >
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            <Skeleton variant="rectangular" width={120} height={120} sx={{ borderRadius: 2, flexShrink: 0 }} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" width={60} height={16} sx={{ mb: 1 }} />
              <Skeleton variant="text" width={180} height={36} sx={{ mb: 1.5 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Skeleton variant="rounded" width={72} height={24} />
                <Skeleton variant="rounded" width={72} height={24} />
              </Box>
            </Box>
          </Box>
        </Paper>
      )}

      {error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error.message}
        </Alert>
      )}

      {data && !isLoading && (
        <Paper
          sx={{
            p: { xs: 2.5, md: 4 },
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 3,
            background:
              'linear-gradient(135deg, rgba(22,27,34,1) 0%, rgba(22,27,34,0.8) 100%)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: 'linear-gradient(90deg, #FF6B6B, #FF8E53)',
            },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, md: 4 },
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Sprite */}
            <Box
              component="img"
              src={data.sprite}
              alt={data.name}
              sx={{
                width: { xs: 96, md: 140 },
                height: { xs: 96, md: 140 },
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.6))',
                flexShrink: 0,
              }}
            />

            {/* Details */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                }}
              >
                #{String(data.id).padStart(3, '0')}
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  fontSize: { xs: '1.8rem', md: '2.4rem' },
                  textTransform: 'capitalize',
                  mt: 0.5,
                  mb: 2,
                  lineHeight: 1.1,
                }}
              >
                {data.name}
              </Typography>

              <Divider sx={{ mb: 2, borderColor: 'rgba(255,255,255,0.06)' }} />

              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  fontSize: '0.65rem',
                  display: 'block',
                  mb: 1,
                }}
              >
                Type{data.types.length > 1 ? 's' : ''}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {data.types.map((type) => (
                  <Chip
                    key={type}
                    label={type}
                    sx={{
                      backgroundColor: TYPE_COLORS[type] ?? '#777',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      height: 28,
                      boxShadow: `0 3px 12px ${TYPE_COLORS[type] ?? '#777'}66`,
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      )}

      {!data && !isLoading && !error && (
        <Box
          sx={{
            textAlign: 'center',
            py: 10,
            border: '2px dashed rgba(255,255,255,0.06)',
            borderRadius: 3,
          }}
        >
          <Typography sx={{ fontSize: '3rem', mb: 2 }}>🔍</Typography>
          <Typography variant="body1" color="text.secondary">
            Enter a Pokémon name above to get started
          </Typography>
        </Box>
      )}
    </Container>
  )
}
