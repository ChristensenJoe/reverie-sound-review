import {useHistory} from "react-router-dom";
import NavBar from "./NavBar"
import { Grid, Button, TextField } from "@material-ui/core"
import { useState, } from "react"




function NewForumPost({ user, setSelectedForumData }) {
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
            author: user.username
        }

        let config ={
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newPost)
        }

        fetch(`${process.env.REACT_APP_API_URL}/posts`, config)
        .then(res => res.json())
        .then(data => {
            setSelectedForumData({article: data, image: randomImage()});
            history.push("/postdetails")
        })
        

    }

    function randomImage(){

        let randomNumber = Math.floor(Math.random() * 100)
      
        
          return `https://picsum.photos/300/200?random=${randomNumber}`
      
      }

    return (
        <>
            <NavBar 
                user={user}
            />
            

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
                            <TextField
                                label="Title"
                                id="title"
                                variant="outlined"
                                required
                                value={formData.title}
                                onChange={onChangeForm}
                                style={{ background: "white", width: "40%", marginLeft: "26vw", marginTop: "10vh" }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Content"
                                multiline
                                rows="6"
                                id="content"
                                required
                                variant="outlined"
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
            
        </>

    )
}

export default NewForumPost