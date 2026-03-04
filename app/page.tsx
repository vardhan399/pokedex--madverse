import { Container, Box, Typography, Button, Grid } from '@mui/material'
import Link from 'next/link'

const PARTS = [
  {
    number: '01',
    title: 'Single Pokémon Lookup',
    description: 'Search for any Pokémon by name and view its details including ID, types, and official sprite.',
    href: '/part-1',
    emoji: '🔍',
    color: '#FF6B6B',
  },
  {
    number: '02',
    title: 'Multi-Pokémon Fetch',
    description: 'Enter comma-separated Pokémon names to fetch and compare multiple entries at once with a paginated table.',
    href: '/part-2',
    emoji: '📋',
    color: '#4ECDC4',
  },
  {
    number: '03',
    title: 'Type-Based Filter',
    description: 'Browse the entire Pokédex and filter Pokémon by their elemental type with instant, cached results.',
    href: '/part-3',
    emoji: '⚡',
    color: '#A98FF3',
  },
]

export default function HomePage() {
  return (
    <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
      {/* Hero */}
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 } }}>
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 900,
            background: 'linear-gradient(135deg, #FF6B6B 0%, #FF8E53 50%, #4ECDC4 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
            lineHeight: 1.1,
          }}
        >
          Full-Stack Pokédex
        </Typography>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ fontWeight: 400, maxWidth: 560, mx: 'auto', lineHeight: 1.6 }}
        >
          Built with Next.js, tRPC, Prisma & Material UI
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            mt: 3,
          }}
        >
          {['Next.js 14', 'tRPC', 'Prisma ORM', 'Material UI', 'TypeScript', 'React Query'].map(
            (tag) => (
              <Box
                key={tag}
                component="span"
                sx={{
                  px: 2,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  bgcolor: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'text.secondary',
                }}
              >
                {tag}
              </Box>
            )
          )}
        </Box>
      </Box>

      {/* Feature cards */}
      <Grid container spacing={3}>
        {PARTS.map((part) => (
          <Grid item xs={12} md={4} key={part.number}>
            <Box
              sx={{
                p: 3.5,
                height: '100%',
                borderRadius: 3,
                border: '1px solid rgba(255,255,255,0.08)',
                bgcolor: 'background.paper',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                transition: 'all 0.25s ease',
                '&:hover': {
                  borderColor: `${part.color}44`,
                  transform: 'translateY(-4px)',
                  boxShadow: `0 12px 32px rgba(0,0,0,0.4), 0 0 0 1px ${part.color}22`,
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography sx={{ fontSize: '2rem' }}>{part.emoji}</Typography>
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 800,
                    letterSpacing: '0.1em',
                    color: part.color,
                    fontSize: '0.7rem',
                  }}
                >
                  PART {part.number}
                </Typography>
              </Box>

              <Typography
                variant="h6"
                sx={{ fontWeight: 700, lineHeight: 1.3 }}
              >
                {part.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7, flex: 1 }}
              >
                {part.description}
              </Typography>

              <Button
                component={Link}
                href={part.href}
                variant="contained"
                fullWidth
                sx={{
                  mt: 'auto',
                  background: `linear-gradient(135deg, ${part.color} 0%, ${part.color}cc 100%)`,
                  boxShadow: `0 4px 15px ${part.color}44`,
                  '&:hover': {
                    boxShadow: `0 6px 20px ${part.color}66`,
                  },
                }}
              >
                Open Part {part.number}
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
