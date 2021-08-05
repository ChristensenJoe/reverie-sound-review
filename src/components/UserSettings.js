import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { Container, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";
import NavBar from "./NavBar";
import sha256 from "sha256";
import Randomstring from "randomstring";


function UserSettings({ user, setUser }) {
    const [usersAll, setUsersAll] = useState([])
    const [profileImgForm, setProfileImgForm] = useState("")
    const [usernameForm, setUsernameForm] = useState("")
    const [passwordForm, setPasswordForm] = useState("")
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState(null)
    const history = useHistory();

    if (!user) {
        history.push("/");
    }

    useEffect(() => {
        let isMounted = true
        fetch('http://localhost:8000/users/')
        .then(res => res.json())
        .then(data => {
            if (isMounted) {
            setUsersAll(data) 
            }
        })
        
        return () => isMounted = false;
    } 
    , [])

   

    useEffect(() => {
        let isMounted = true
        fetch(`http://localhost:8000/users?username=${user.username}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setUserId(data[0].id)
                }
            })
        return () => isMounted = false;
    }, [user.username])

    function handleLogOut() {
        history.push('/')
    }

    function onUpdateProfileImage(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/users/${userId}`, {
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
    }

    function onUpdateUsername(e) {
        e.preventDefault();
        let isUsername = true

        usersAll.forEach(data => {
            if (!(data.username === usernameForm)) {
                isUsername = false;
            }
        })

        if (isUsername) {
        fetch(`http://localhost:8000/users/${userId}`, {
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
        }
        else {
            alert('Username taken!')
        }
    }

    function onUpdatePassword(e) {
        e.preventDefault();
        const saltPassword = Randomstring.generate();
        const hashedPassword = sha256(saltPassword + passwordForm);

        fetch(`http://localhost:8000/users/${userId}`, {
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
    }

    function handleDeleteAccount() {
        fetch(`http://localhost:8000/users/${userId}`, {
            method: "DELETE"
        })
            .then(res => res.json())
            .then(data => {
                history.push("/")
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
            <h1 style={{textAlign: "center"}}>User Settings</h1>
            <Container>

                <h3 style={{marginTop: "50px"}}>Update Profile Image</h3>
                <form onSubmit={onUpdateProfileImage}>
                    <TextField
                        label="Profile Image URL"
                        id="profileImg"
                        value={profileImgForm}
                        onChange={(e) => { setProfileImgForm(e.target.value) }}
                        required
                        style={{width: "80%"}}
                        variant="outlined">
                    </TextField>

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
                </form>

                <h3>Update Username</h3>
                <form onSubmit={onUpdateUsername}>
                    <TextField
                        style={{width: "80%"}}
                        label="Username"
                        id="username"
                        required
                        value={usernameForm}
                        onChange={(e) => { setUsernameForm(e.target.value) }}
                        variant="outlined">
                    </TextField>

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
                </form>

                <h3>Update Password</h3>
                <form onSubmit={onUpdatePassword}>
                    <TextField
                        label="password"
                        id="password"
                        placeholder="Password"
                        required
                        value={passwordForm}
                        onChange={(e) => { setPasswordForm(e.target.value) }}
                        style={{width: "80%"}}
                        variant="outlined">
                    </TextField>

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
                </form>
                <br></br>
                <h3 style={{textAlign: "center"}}>Delete Account</h3>
                <Button
                    onClick={handleClickOpen}
                    type="submit"
                    variant="contained" color="primary" className="form__custom-button" style={{
                        verticalAlign: "middle",
                        display: "flex",
                        textAlign: "center",
                        margin: "20px",
                        marginLeft: "auto",
                        marginRight: "auto"

                    }}>
                    Delete Account
                </Button>
                <br />
                <h3 style={{textAlign: "center"}}>Logout</h3>
                <Button
                    onClick={handleLogOut}
                    type="submit"
                    variant="contained" color="primary" className="form__custom-button" style={{
                        verticalAlign: "middle",
                        display: "flex",
                        textAlign: "center",
                        margin: "20px",
                        marginLeft: "auto",
                        marginRight: "auto"

                    }}>
                    Logout
                </Button>
                
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
            </Container>


        </>
    )
}

export default UserSettings;