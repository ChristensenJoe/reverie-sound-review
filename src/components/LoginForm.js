import { Input, Button, Box, Grid } from "@material-ui/core"
import { useState } from "react"
import sha256 from "sha256";
import {useHistory} from "react-router-dom"

function LoginForm({ userData, updateUser }) {
    const history = useHistory();


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
            updateUser(formData.username);
            history.push("/dashboard")
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

                <Grid container justifyContent="center" spacing={8}>
                    <Grid item xs={12}>
                        <Input
                            label="username"
                            id="username"
                            placeholder="Username"
                            required
                            value={formData.username}
                            onChange={onChangeForm}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            label="Password"
                            id="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={onChangeForm}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box marginBottom="4vh">
                        <Button type="submit" variant="contained" color="primary" className="form__custom-button">
                            Log in
                        </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>

    )
}

export default LoginForm