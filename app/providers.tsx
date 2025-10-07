'use client'

import { CacheProvider } from '@emotion/react'
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import createCache from '@emotion/cache'
import { ReactNode } from 'react'

// Emotion cache for MUI & Chakra harmony
const cache = createCache({ key: 'css', prepend: true })

// Material UI theme setup
const muiTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0070f3' },
    background: { default: '#fffaf6' },
  },
  typography: {
    fontFamily: ['Inter', 'Poppins', 'sans-serif'].join(','),
  },
})

// Chakra custom theme setup
const chakraTheme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#fffaf6',
        color: '#0b0b0b',
        _dark: {
          bg: '#0b0b0b',
          color: '#fffaf6',
        },
      },
    },
  },
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Inter', sans-serif`,
  },
})

export function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={muiTheme}>
        <ChakraProvider theme={chakraTheme}>
          <CssBaseline />
          {children}
        </ChakraProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
