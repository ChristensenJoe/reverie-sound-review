import { Grid, Box } from "@material-ui/core"
import { Button, ButtonGroup } from '@material-ui/core'
import LoginForm from "./LoginForm"
import { useState, useEffect } from "react"
import SignUpForm from "./SignUpForm"
import rev from "../images/rev.png"
import { ThemeProvider } from "@material-ui/core"
import theme from "../styles/theme"
import '../styles/w3.css'


function Login({ updateUser }) {

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
            <div
            style={{
                background: "white"
            }}
            >

                <Grid container spacing={1}>

                    <Grid item xs={12} sm={5}>
                        <Box overflow="hidden" height="100vh">
                            <img class="w3-animate-left" style={{ objectFit: "contain" }} alt="testimg" src="https://cdn.pixabay.com/photo/2020/01/27/19/22/piano-4798138_1280.jpg"></img>
                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={7}>
                        <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            height="100vh"
                            overflow="hidden"
                            textAlign="center"
                        >
                            <div>

                                <img
                                    class="w3-animate-top"
                                    height="400px"
                                    alt="logo"
                                    src={rev}
                                />
                                <div
                                    style={{ border: "solid 2px" }}

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
                                                className="w3-animate-zoom"
                                                variant="contained"
                                                color="primary"
                                                onClick={() => setIsShowingLogin(true)}>Login
                                            </Button>
                                            <Button
                                                className="w3-animate-zoom"
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => setIsShowingLogin(false)}>Sign-Up
                                            </Button>
                                        </ButtonGroup>

                                    </div>
                                    <hr
                                        style={{
                                            width: "60%",
                                            marginBottom: "40px",
                                            marginLeft: "90px"
                                        }}
                                    />
                                    {
                                        isShowingLogin ?
                                            <LoginForm
                                                updateUser={updateUser}
                                                userData={userData}
                                            />
                                            :
                                            <SignUpForm
                                                updateUser={updateUser}
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
