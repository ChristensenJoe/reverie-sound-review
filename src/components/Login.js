import { Grid, Box } from "@material-ui/core"
import { Button, ButtonGroup } from '@material-ui/core'
import LoginForm from "./LoginForm"
import { useState, useEffect } from "react"
import SignUpForm from "./SignUpForm"
import revlogo from "../images/revlogo.png"
import '../styles/w3.css'


function Login({ updateUser }) {



    const [isShowingLogin, setIsShowingLogin] = useState(true)
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        let isMounted = true;
        fetch("http://localhost:8000/users")
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setUserData(data);
                }
            })

        return () => { isMounted = false }
    }, [])

    return (

        
            <div
                style={{
                    background: "white"
                }}
            >

                <Grid container spacing={1}>

                    <Grid item xs={12} sm={5}>
                        <Box overflow="hidden" height="100vh">
                            <img className="w3-animate-left" style={{ objectFit: "contain" }} alt="testimg" src="https://cdn.pixabay.com/photo/2020/01/27/19/22/piano-4798138_1280.jpg"></img>
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
                                    className="w3-animate-top"
                                    height="350px"
                                    alt="logo"
                                    src={revlogo}
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

                                            variant="contained"
                                            color="primary"
                                        >
                                            <Button     
                                                variant="contained"
                                                color={isShowingLogin ? "primary" : "secondary"}
                                                onClick={() => setIsShowingLogin(true)}>Login
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color={isShowingLogin ? "secondary" : "primary"}
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
        
    );
}

export default Login;
