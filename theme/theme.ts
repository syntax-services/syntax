"use client";
import { createTheme } from "@mui/material/styles";

export const muiTheme = (mode: "light" | "dark" = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#1a91ff" },
      background: {
        default: mode === "dark" ? "#0a0a0a" : "#f9fafb",
        paper: mode === "dark" ? "#111111" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#111111",
        secondary: mode === "dark" ? "#b3b3b3" : "#333333",
      },
    },
    typography: {
      fontFamily: "'Inter', sans-serif",
      button: { textTransform: "none" },
    },
    shape: { borderRadius: 12 },
  });
