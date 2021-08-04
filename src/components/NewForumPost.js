import {useHistory} from "react-router-dom";
import NavBar from "./NavBar"
import { OutlinedInput, Grid, Button } from "@material-ui/core"
import { useState, } from "react"
import theme from "../styles/theme.js"
import { ThemeProvider } from "@material-ui/styles"



function NewForumPost({user}) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    })

    if(!user) {
        history.push("/")
    }

    function onChangeForm(e) {
        setFormData(formData => { return { ...formData, [e.target.id]: e.target.value } })
    }

    function onSubmitForm(e) {
        e.preventDefault()

        const newPost = {
            title: formData.title,
            content: formData.content,
            author: user
        }

        let config ={
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newPost)
        }

        fetch('http://localhost:8000/posts', config)
        .then(res => res.json())
        .then()
        

    }



    return (
        <>
            <NavBar 
                user={user}
            />
            <ThemeProvider theme={theme}>

                <div
                    style={{
                        marginTop: "5%",
                        width: "100%",
                        textAlign: "center",
                        color: "#fe7f2d",
                        justifyContent: "center",
                    }}
                >
                    <span
                        style={{
                            backgroundColor: "#111",
                            color: "#fe7f2d",
                            padding: "18px",
                            fontSize: "25px",
                            letterSpacing: "10px",
                            marginRight: "7vw"
                        }}
                    >
                        Add Post</span>
                </div>


                <form className="form"
                    onSubmit={onSubmitForm}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <OutlinedInput
                                label="title"
                                id="title"
                                placeholder="Title"
                                required
                                value={formData.title}
                                onChange={onChangeForm}
                                style={{ background: "white", width: "40%", marginLeft: "26vw", marginTop: "10vh" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <OutlinedInput
                                label="content"
                                multiline
                                rows="6"
                                id="content"
                                placeholder="Content"
                                required
                                value={formData.content}
                                onChange={onChangeForm}
                                style={{ background: "white", width: "40%", marginLeft: "26vw" }}
                            />

                        </Grid>

                        <Button type="submit" variant="contained" color="primary" className="form__custom-button" style={{ marginLeft: "43vw" }}>
                            Submit Post
                        </Button>

                    </Grid>
                </form>
            </ThemeProvider>
        </>

    )
}

export default NewForumPost