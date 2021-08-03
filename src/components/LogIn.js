import { Grid, Box } from "@material-ui/core"
import { Button, ButtonGroup } from '@material-ui/core'
import LoginForm from "./LoginForm"
import { useState, useEffect } from "react"
import SignUpForm from "./SignUpForm"
import logo from "../images/logo.gif"
import {ThemeProvider} from "@material-ui/core"
import theme from "../styles/theme"

 
function Login() {

    const [isShowingLogin, setIsShowingLogin] = useState(true)
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/users")
            .then(res => res.json())
            .then(data => {
                setUserData(data);
            })
    }, [])

    return (
     
    <ThemeProvider theme={theme}>
       <div>
            
            <Grid container spacing={1}>

                <Grid item xs={12} sm={5}>
                    <Box overflow="hidden" height="100vh">
                        <img style={{ objectFit: "contain" }} alt="testimg" src="https://cdn.pixabay.com/photo/2020/01/27/19/22/piano-4798138_1280.jpg"></img>
                    </Box>
                </Grid>

                <Grid item xs={12} sm={7}>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100vh"
                        overflow="hidden"
                    >
                        <div>

                            <img
                                height="400vh"
                                alt="logo"
                                src={logo}
                            />
                            <div
                                style={{border: "solid 2px"}}
                                
                            >
                                <div
                                    style={{
                                        margin: "18px"
                                    }}
                                >
                                
                                    <ButtonGroup
                                        disableElevation variant="contained" color="primary"
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => setIsShowingLogin(true)}>Login
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => setIsShowingLogin(false)}>Sign-Up
                                        </Button>
                                    </ButtonGroup>
                                
                                </div>
                                <hr
                                    style={{
                                        width: "60%",
                                        marginBottom: "40px"
                                    }}
                                />
                                {
                                    isShowingLogin ?
                                        <LoginForm
                                            userData={userData}
                                        />
                                        :
                                        <SignUpForm
                                            userData={userData}
                                        />
                                }
                            </div>
                        </div>
                    </Box>
                </Grid>
            </Grid>
        </div>
    </ThemeProvider>
    );
}

export default Login;