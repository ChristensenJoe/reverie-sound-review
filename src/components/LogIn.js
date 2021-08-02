import {Grid, Hidden, Paper, Box} from "@material-ui/core"
import { FormControl, FormLabel, FormHelperText, Input, InputLabel, TextField } from '@material-ui/core'

function Login() {
    
    const section = {
        height: "100%",
        paddingTop: 5,
        backgroundColor: "#fff",
      };


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
                    <form >
                        <input name='email' type='text'></input>
                    </form>
                </Box>
             </Grid>

        </Grid> 
            
        </div>
    );
}

export default Login;