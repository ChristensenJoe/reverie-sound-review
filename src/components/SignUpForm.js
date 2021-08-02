import {Input, Button, Box, Grid} from "@material-ui/core"


function SignUpForm () {
    
    
    return (
        <Box>
             <form className="form">
            
            <Grid container justifyContent="center" spacing={3}>
               <Grid item xs={12}>
                    <Input
                      labelText="username"
                      id="username"
                     placeholder="Username"
                     />
               </Grid>
               <Grid item xs={12}>
                 <Input
                     labelText="Password"
                     id="password"
                     placeholder="Password"
                 />
               </Grid>
            <Grid item xs={12}>
                <Button type="button" color="primary" className="form__custom-button">
                    Sign-Up
                </Button>
            </Grid>
            </Grid>
        </form>
    </Box>

    )
}

export default SignUpForm