import {AppBar, Toolbar, Typography} from "@mui/material";

const Header = () => {
    return (
        <>
            <AppBar style={{ height: "100%"}} position="static">
                <Toolbar  style={{ height: "100%"}}>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Порешайка
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Header;
