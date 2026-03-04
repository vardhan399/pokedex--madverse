'use client'

import { useState } from 'react'
import { Box, Typography, Alert } from '@mui/material'
import { PokemonTypeSelection } from './PokemonTypeSelection'
import { PokedexTable } from './PokedexTable'
import { trpc } from '@/lib/trpc'

export function FilterablePokedexTable() {
  const [selectedType, setSelectedType] = useState<string | undefined>(undefined)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const { data: availableTypes = [] } = trpc.pokemon.getAvailableTypes.useQuery(
    undefined,
    {
      staleTime: 10 * 60 * 1000,
    }
  )

  const {
    data,
    isLoading,
    error,
  } = trpc.pokemon.getPokemonByType.useQuery(
    {
      type: selectedType,
      limit: rowsPerPage,
      offset: page * rowsPerPage,
    },
    {
      staleTime: 3 * 60 * 1000,
      keepPreviousData: true,
    } as Parameters<typeof trpc.pokemon.getPokemonByType.useQuery>[1]
  )

  const handleSelectType = (type: string | undefined) => {
    setSelectedType(type)
    setPage(0)
  }

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage)
    setPage(0)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {/* Type Filter Controls */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Box sx={{ flex: '1 1 240px', maxWidth: 320 }}>
          <PokemonTypeSelection
            selectedType={selectedType}
            selectType={handleSelectType}
            availableTypes={availableTypes}
          />
        </Box>

        {data && (
          <Typography variant="body2" color="text.secondary" sx={{ flex: '0 0 auto' }}>
            {data.total} Pokémon
            {selectedType ? ` of type ${selectedType}` : ' total'}
          </Typography>
        )}
      </Box>

      {/* Error State */}
      {error && (
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error.message}
        </Alert>
      )}

      {/* Table */}
      <PokedexTable
        pokemonList={data?.pokemon ?? []}
        total={data?.total ?? 0}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        isLoading={isLoading}
      />
    </Box>
  )
}
