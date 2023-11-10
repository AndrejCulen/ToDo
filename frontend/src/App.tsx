import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GlobalStyle } from './styles/globalStyles'
import { ThemeProvider } from "styled-components"
import { LightThemeSchema, DarkThemeSchema } from './styles/theme'
import Home from './Home'

const queryClient = new QueryClient()

export default function App() {
  
  const isDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches

  return (
    <div className="App">
      <ThemeProvider theme={isDarkTheme ? DarkThemeSchema : LightThemeSchema}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
      </ThemeProvider>
    </div>
  )
}