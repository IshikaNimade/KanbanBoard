import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    ternery: Palette["primary"];
  }

  interface PaletteOptions {
    ternery?: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#191970",
    },
    secondary: {
      main: "#F8F8FF",
    },
    ternery: {
      main: "#E6E6FA",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
});

export default theme;
