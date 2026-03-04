'use client'

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  useScrollTrigger,
} from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
  { label: 'Single Lookup', href: '/part-1' },
  { label: 'Multi Fetch', href: '/part-2' },
  { label: 'Type Filter', href: '/part-3' },
]

export function Navigation() {
  const pathname = usePathname()
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 10 })

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: scrolled ? 'rgba(13, 17, 23, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ py: 0.5 }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                mr: 4,
              }}
            >
              📖 Pokédex
            </Typography>
          </Link>

          {/* Nav Items */}
          <Box sx={{ display: 'flex', gap: 1 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href
              return (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  size="small"
                  sx={{
                    color: isActive ? 'primary.main' : 'text.secondary',
                    fontWeight: isActive ? 700 : 500,
                    px: 2,
                    py: 0.75,
                    fontSize: '0.85rem',
                    backgroundColor: isActive
                      ? 'rgba(255, 107, 107, 0.12)'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 107, 107, 0.08)',
                      color: 'text.primary',
                    },
                    transition: 'all 0.15s ease',
                  }}
                >
                  {item.label}
                </Button>
              )
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
