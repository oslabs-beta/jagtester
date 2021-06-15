import React from 'react';
import Container from 'react-bootstrap/Container';

//MUI imports
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const App: () => JSX.Element = () => {
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: 'dark',
                },
            }),
        []
    );

    // end  ----------------------------------- socket io funcitonality
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container fluid className="mx-0 px-0">
                This is our APppp
            </Container>
        </ThemeProvider>
    );
};

export default App;
