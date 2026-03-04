'use client'

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  Chip,
} from '@mui/material'
import { TYPE_COLORS, type PokemonType } from '@/types/pokemon'

export type PokemonTypeSelectionProps = {
  selectedType: string | undefined
  selectType: (type: string | undefined) => void
  availableTypes: string[]
}

export function PokemonTypeSelection({
  selectedType,
  selectType,
  availableTypes,
}: PokemonTypeSelectionProps) {
  return (
    <FormControl fullWidth>
      <InputLabel
        id="pokemon-type-label"
        sx={{ color: 'text.secondary' }}
      >
        Filter by Type
      </InputLabel>
      <Select
        labelId="pokemon-type-label"
        id="pokemon-type-select"
        value={selectedType ?? ''}
        label="Filter by Type"
        onChange={(e) => {
          const val = e.target.value
          selectType(val === '' ? undefined : val)
        }}
        renderValue={(value) => {
          if (!value) {
            return (
              <Typography variant="body2" color="text.secondary">
                All Types
              </Typography>
            )
          }
          return (
            <Chip
              label={value}
              size="small"
              sx={{
                backgroundColor: TYPE_COLORS[value] ?? '#777',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                height: 22,
                pointerEvents: 'none',
              }}
            />
          )
        }}
        sx={{
          '& .MuiSelect-select': {
            display: 'flex',
            alignItems: 'center',
            py: 1.5,
          },
        }}
      >
        <MenuItem value="">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                bgcolor: 'rgba(255,255,255,0.2)',
                border: '1px dashed rgba(255,255,255,0.4)',
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              All Types
            </Typography>
          </Box>
        </MenuItem>

        {availableTypes.map((type) => (
          <MenuItem key={type} value={type}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  backgroundColor: TYPE_COLORS[type] ?? '#777',
                  boxShadow: `0 0 6px ${TYPE_COLORS[type] ?? '#777'}88`,
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  textTransform: 'capitalize',
                }}
              >
                {type}
              </Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
