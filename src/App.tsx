import './App.module.css'
import {Header} from "./modules/Header";
import {Container, Grid} from "@mui/material";
import {Mathematics} from "./pages/Mathematics";

function App() {

    return (
    <Container maxWidth="lg" style={{ height: '100vh' }}>
        <Grid rowGap={1} wrap={'nowrap'} container direction="column" style={{ height: '100%' }}>
            <Grid item xs={1} >
                <Header/>
            </Grid>
            <Grid item xs={11}>
                <Mathematics/>
            </Grid>
        </Grid>
    </Container>
    )
}

export default App
