import { useHistory } from "react-router-dom";
import { useState } from "react";
import { Grid, Box, OutlinedInput, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import theme from "../styles/theme.js"
import { ThemeProvider } from "@material-ui/styles"
import NavBar from "./NavBar";
import sha256 from "sha256";
import Randomstring from "randomstring";


function UserSettings({ user, setUser }) {
    const [profileImgForm, setProfileImgForm] = useState("")
    const [usernameForm, setUsernameForm] = useState("")
    const [passwordForm, setPasswordForm] = useState("")
    const [open, setOpen] = useState(false);
    const history = useHistory();

    if (!user) {
        history.push("/");
    }

    function onUpdateProfileImage(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/users?username=${user.username}`)
            .then(res => res.json())
            .then(data => {
                fetch(`http://localhost:8000/users/${data[0].id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        profileImage: profileImgForm
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setUser((user) => {
                            return {
                                ...user,
                                profileImage: profileImgForm
                            }
                        })
                        setProfileImgForm("")
                    })
            })
    }

    function onUpdateUsername(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/users?username=${user.username}`)
            .then(res => res.json())
            .then(data => {
                fetch(`http://localhost:8000/users/${data[0].id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: usernameForm
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setUser((user) => {
                            return {
                                ...user,
                                username: usernameForm
                            }
                        })
                        setUsernameForm("")
                    })
            })
    }

    function onUpdatePassword(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/users?username=${user.username}`)
            .then(res => res.json())
            .then(data => {

                const saltPassword = Randomstring.generate();
                const hashedPassword = sha256(saltPassword + passwordForm);

                fetch(`http://localhost:8000/users/${data[0].id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        saltPassword: saltPassword,
                        hashedPassword: hashedPassword
                    })
                })
                    .then(res => res.json())
                    .then(() => {
                        setPasswordForm("");
                    });
            })
    }

    function handleDeleteAccount() {
        fetch(`http://localhost:8000/users?username=${user.username}`)
            .then(res => res.json())
            .then(data => {
                fetch(`http://localhost:8000/users/${data[0].id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        history.push("/")
                    })
            })
    }

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <NavBar
                user={user}
            />
            <ThemeProvider theme={theme}>
                <Box
                    textAlign="Left"
                    marginLeft="20px"
                >
                    <h1>User Settings</h1>
                </Box>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Box
                            textAlign="Left"
                            marginLeft="20px"
                        >
                            <h3>Update Profile Image</h3>
                        </Box>
                        <form onSubmit={onUpdateProfileImage}>
                            <Box
                                marginBottom="10px"
                                marginLeft="20px"
                            >
                                <OutlinedInput
                                    label="profileImg"
                                    id="profileImg"
                                    placeholder="Profile Img URL"
                                    value={profileImgForm}
                                    onChange={(e) => { setProfileImgForm(e.target.value) }}
                                    required
                                    style={{
                                        background: "white", width: "40%",
                                        display: "inline-block",
                                        textAlign: "left",
                                        margin: "20px"
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained" color="primary" className="form__custom-button" style={{
                                        verticalAlign: "middle",
                                        display: "inline-block",
                                        textAlign: "left",
                                        margin: "20px"
                                    }}>
                                    Update Profile Image
                                </Button>
                            </Box>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            textAlign="Left"
                            marginLeft="20px"
                        >
                            <h3>Update Username</h3>
                        </Box>
                        <form onSubmit={onUpdateUsername}>
                            <Box
                                marginBottom="10px"
                                marginLeft="20px"
                            >
                                <OutlinedInput
                                    label="username"
                                    id="username"
                                    placeholder="Username"
                                    required
                                    value={usernameForm}
                                    onChange={(e) => { setUsernameForm(e.target.value) }}
                                    style={{
                                        background: "white", width: "40%",
                                        display: "inline-block",
                                        textAlign: "left",
                                        margin: "20px"
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained" color="primary" className="form__custom-button" style={{
                                        verticalAlign: "middle",
                                        display: "inline-block",
                                        textAlign: "left",
                                        margin: "20px"
                                    }}>
                                    Update Username
                                </Button>
                            </Box>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            textAlign="Left"
                            marginLeft="20px"
                        >
                            <h3>Update Password</h3>
                        </Box>
                        <form onSubmit={onUpdatePassword}>
                            <Box
                                marginBottom="10px"
                                marginLeft="20px"
                            >
                                <OutlinedInput
                                    label="password"
                                    id="password"
                                    placeholder="Password"
                                    required
                                    value={passwordForm}
                                    onChange={(e) => { setPasswordForm(e.target.value) }}
                                    style={{
                                        background: "white", width: "40%",
                                        display: "inline-block",
                                        textAlign: "left",
                                        margin: "20px"
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained" color="primary" className="form__custom-button" style={{
                                        verticalAlign: "middle",
                                        display: "inline-block",
                                        textAlign: "left",
                                        margin: "20px"
                                    }}>
                                    Update Password
                                </Button>
                            </Box>
                        </form>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            textAlign="Left"
                            marginLeft="20px"
                        >
                            <h3>Delete Account</h3>
                        </Box>
                        <Button
                            onClick={handleClickOpen}
                            type="submit"
                            variant="contained" color="primary" className="form__custom-button" style={{
                                verticalAlign: "middle",
                                display: "inline-block",
                                textAlign: "left",
                                margin: "20px"
                            }}>
                            Delete Account
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                    </Grid>
                </Grid>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Are You Sure?"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText
                            id="alert-dialog-description"
                        >
                            You are about to permanently delete your account.
                        </DialogContentText>
                        <DialogContentText
                            id="alert-dialog-description"
                        >
                            This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Box
                            display="inline-block"
                            margin="0px auto"
                            overflow="auto"
                            whiteSpace="nowrap"
                            width="100%"
                        >
                            <Button
                                onClick={handleDeleteAccount}
                                color="primary"
                                style={{
                                    marginRight: "10px",
                                    float: "left"
                                }}
                            >
                                Delete Account
                            </Button>
                            <Button
                                onClick={handleClose}
                                color="primary"
                                style={{
                                    marginRight: "15px",
                                    float: "left"
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </>
    )
}

export default UserSettings;