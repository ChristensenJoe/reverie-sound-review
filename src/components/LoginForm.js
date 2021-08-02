import {Input, Button, Box, Grid} from "@material-ui/core"
import {useState} from "react"


function LoginForm () {
    
    const [formData, setFormData] = useState({
        username: "",
        hashedPassword: "",
        saltPassword: ""
    })

    function onChangeForm(e) {
        setFormData(formData => {return {...formData, [e.target.id]: e.target.value}})
    }

    console.log(formData)
    return (
        <Box>
             <form className="form">
            
            <Grid container justifyContent="center" spacing={3}>
               <Grid item xs={12}>
                    <Input
                      labelText="username"
                      id="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={onChangeForm}
                     />
               </Grid>
               <Grid item xs={12}>
                 <Input
                     labelText="Password"
                     id="hashedPassword"
                     placeholder="Password"
                     value={formData.hashedPassword}
                     onChange={onChangeForm}
                 />
               </Grid>
            <Grid item xs={12}>
                <Button type="button" color="primary" className="form__custom-button">
                    Log in
                </Button>
            </Grid>
            </Grid>
        </form>
    </Box>

    )
}

export default LoginForm