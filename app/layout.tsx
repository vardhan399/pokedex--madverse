import type { Metadata } from 'next'
import { TRPCProvider } from '@/components/TRPCProvider'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Navigation } from '@/components/Navigation'
import { Box } from '@mui/material'

export const metadata: Metadata = {
  title: 'Pokédex — Full Stack App',
  description: 'A full-stack Pokédex built with Next.js, tRPC, Prisma, and Material UI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body style={{ margin: 0 }}>
        <ThemeProvider>
          <TRPCProvider>
            <Box
              sx={{
                minHeight: '100vh',
                bgcolor: 'background.default',
                backgroundImage:
                  'radial-gradient(ellipse at 80% 0%, rgba(255,107,107,0.05) 0%, transparent 60%), radial-gradient(ellipse at 20% 100%, rgba(78,205,196,0.04) 0%, transparent 60%)',
              }}
            >
              <Navigation />
              <Box component="main">{children}</Box>
            </Box>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
