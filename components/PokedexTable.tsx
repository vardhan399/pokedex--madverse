'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  Typography,
  Skeleton,
} from '@mui/material'
import { PokemonRow } from './PokemonRow'
import { type Pokemon } from '@/types/pokemon'

interface PokedexTableProps {
  pokemonList: Pokemon[]
  total: number
  page: number
  rowsPerPage: number
  onPageChange: (newPage: number) => void
  onRowsPerPageChange: (newRowsPerPage: number) => void
  isLoading?: boolean
}

export function PokedexTable({
  pokemonList,
  total,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  isLoading = false,
}: PokedexTableProps) {
  if (isLoading) {
    return (
      <TableContainer
        component={Paper}
        sx={{
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sprite</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Types</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rowsPerPage }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton variant="text" width={40} /></TableCell>
                <TableCell><Skeleton variant="rectangular" width={56} height={56} sx={{ borderRadius: 1 }} /></TableCell>
                <TableCell><Skeleton variant="text" width={100} /></TableCell>
                <TableCell><Skeleton variant="rounded" width={70} height={22} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  if (pokemonList.length === 0) {
    return (
      <Box
        sx={{
          py: 8,
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 3,
          bgcolor: 'background.paper',
        }}
      >
        <Typography variant="h1" sx={{ fontSize: '3rem', mb: 2 }}>
          🔍
        </Typography>
        <Typography variant="h6" color="text.secondary">
          No Pokémon found
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Try a different search query
        </Typography>
      </Box>
    )
  }

  return (
    <Paper
      sx={{
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      <TableContainer>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Sprite</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Types</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemonList.map((pokemon) => (
              <PokemonRow key={pokemon.id} pokemon={pokemon} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={total}
        page={page}
        onPageChange={(_, newPage) => onPageChange(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) =>
          onRowsPerPageChange(parseInt(e.target.value, 10))
        }
        rowsPerPageOptions={[5, 10, 25]}
        sx={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          color: 'text.secondary',
        }}
      />
    </Paper>
  )
}
