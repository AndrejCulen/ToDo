import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Todos from './Home'
import { GlobalStyle } from './styles/globalStyles'
import { ThemeContext } from './contexts/themeContext'
import { ThemeProvider } from "styled-components"
import { LightThemeSchema, DarkThemeSchema } from './styles/theme'

const queryClient = new QueryClient()

export default function App() {
  
  const isBrowserDefaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  
  return (
    <div className="App">
      <ThemeProvider theme={isBrowserDefaultDark ? DarkThemeSchema : LightThemeSchema}>
        <GlobalStyle />
        <QueryClientProvider client={queryClient}>
            <Todos />
        </QueryClientProvider>
      </ThemeProvider>

    </div>
  )
}