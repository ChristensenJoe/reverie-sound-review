import { Input, Button, Box, Grid } from "@material-ui/core"
import { useState } from "react"
import sha256 from "sha256";


function LoginForm({ userData }) {



    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })
    function onChangeForm(e) {
        setFormData(formData => { return { ...formData, [e.target.id]: e.target.value } })
    }

    function onSubmitForm(e) {
        e.preventDefault();
        let isLoggedIn = false;
        userData.forEach((data) => {
            if (data.username === formData.username) {
                let hashedPassword = sha256(data.saltPassword + formData.password)
                
                if (hashedPassword === data.hashedPassword) {
                    isLoggedIn = true;
                }
            }
        });

        if (isLoggedIn) {
            //route
        }
        else {
            alert("Incorrect username/password");
        }
    }

    return (
        <Box>
            <form className="form" 
            onSubmit={onSubmitForm}
            >

                <Grid container justifyContent="center" spacing={3}>
                    <Grid item xs={12}>
                        <Input
                            label="username"
                            id="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={onChangeForm}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            label="Password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={onChangeForm}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" color="primary" className="form__custom-button">
                            Log in
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>

    )
}

export default LoginForm