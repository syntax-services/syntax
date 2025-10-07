"use client"

import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material"
import { ChakraProvider } from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/theme-utils"
import { ReactNode } from "react"

// ✅ Create Emotion cache (for MUI + Chakra compatibility)
const cache = createCache({ key: "css", prepend: true })

// ✅ Chakra theme customization
const chakraTheme = extendTheme({
  colors: {
    brand: {
      50: "#f5faff",
      100: "#e0f0ff",
      200: "#b3daff",
      300: "#80c2ff",
      400: "#4da9ff",
      500: "#1a91ff",
      600: "#0074e0",
      700: "#0058b3",
      800: "#003c80",
      900: "#00214d",
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },
})

// ✅ MUI theme (Material + Tailwind coherence)
const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#1a91ff" },
    background: { default: "#f9fafb" },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
  },
})

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <ChakraProvider theme={chakraTheme}>
          {children}
        </ChakraProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}
