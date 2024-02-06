import { AppBar, Container, Toolbar, Typography } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CarList from "./component/CarList";

export const queryClient = new QueryClient();

const App = () => {
  return (
    <Container maxWidth='xl'>
      <AppBar position="static">
          <Toolbar>
            <Typography style={{ textAlign: 'center', width: '100%' }} variant="h3">
            🚦  🏁 Car Show 🏁  🚦
            </Typography>
          </Toolbar>
      </AppBar>


<QueryClientProvider client={queryClient}>
<CarList/>
</QueryClientProvider>
    </Container>
  )
}
export default App