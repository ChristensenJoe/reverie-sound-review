import { Input, Button, Box, Grid } from "@material-ui/core"
import { useState } from "react"
import sha256 from "sha256";
import Randomstring from 'randomstring';
import {useHistory} from "react-router-dom";
import '../styles/w3.css'


function SignUpForm({ userData, updateUser }) {
    const history = useHistory();
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
                saltPassword: saltPassword,
                profileImage: ""
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
                    updateUser({
                        username: formData.username,
                        profileImage: newUser.profileImage
                    });
                    history.push("/dashboard");
                })
        }
        else {
            alert("Username taken")
            setFormData({
                username: "",
                password: ""
            })
        }
    }

    return (
        <Box>
            <form className="form" onSubmit={onSubmitForm}>

                <Grid container justifyContent="center" spacing={8}>
                    <Grid item xs={12}>
                        <Input
                            label="username"
                            id="username"
                            placeholder="Username"
                            required
                            value={formData.username}
                            onChange={onFormChange}
                            className="w3-animate-zoom"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            label="Password"
                            id="password"
                            placeholder="Password"
                            required
                            value={formData.password}
                            onChange={onFormChange}
                            className="w3-animate-zoom"
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <Box marginBottom="10px">
                       
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            className="form__custom-button" >
                            Sign-Up
                        </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Box>

    )
}

export default SignUpForm