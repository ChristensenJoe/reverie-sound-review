import { Input, Button, Box, Grid } from "@material-ui/core"
import { useState } from "react"
import sha256 from "sha256";
import Randomstring from 'randomstring';


function SignUpForm({ userData }) {

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    function onFormChange(e) {
        setFormData(formData => {
            return {
                ...formData,
                [e.target.id]: e.target.value
            }
        });
    }

    function onSubmitForm(e) {
        e.preventDefault();
        let isValid = true;

        userData.forEach(data => {
            if (!(data.username === formData.username)) {
                isValid = true;
            }
            else {
                isValid = false;
            }
        })

        if (isValid) {
            const saltPassword = Randomstring.generate();
            const hashedPassword = sha256(saltPassword + formData.password);

            const newUser = {
                username: formData.username,
                hashedPassword: hashedPassword,
                saltPassword: saltPassword
            }

            fetch("http://localhost:8000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(data => {
                    //setUserState
                    //route
                })
        }
        else {
            alert("Username taken")
        }
    }

    return (
        <Box>
            <form className="form" onSubmit={onSubmitForm}>

                <Grid container justifyContent="center" spacing={3}>
                    <Grid item xs={12}>
                        <Input
                            label="username"
                            id="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={onFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            label="Password"
                            id="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={onFormChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            color="primary"
                            className="form__custom-button">
                            Sign-Up
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>

    )
}

export default SignUpForm