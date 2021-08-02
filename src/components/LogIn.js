import {Grid, Hidden, Box} from "@material-ui/core"
import { Button } from '@material-ui/core'
import LoginForm from "./LoginForm"
import {useState} from "react"
import SignUpForm from "./SignUpForm"

function Login() {
    
    const [isShowingLogin, setIsShowingLogin] = useState(true)


    return (
        <div>
            
        <Grid container spacing={1}>

            <Grid item xs={12} sm={6}>
                <Box overflow="hidden">
                    <img src="https://cdn.pixabay.com/photo/2020/04/19/10/16/can-5062930_1280.jpg"></img>
                </Box>  
            </Grid>

            <Grid item xs={12} sm={6}>
            <Box>
              <div style={{marginBottom: "20px"}}>
                <Button onClick={() => setIsShowingLogin(true)}>Login</Button>
                <Button onClick={() => setIsShowingLogin(false)}>Sign-Up</Button>
             </div>
              

                {isShowingLogin ?  <LoginForm /> : <SignUpForm />}
            </Box>
              
            </Grid>

        </Grid> 
            
        </div>
    );
}

export default Login;