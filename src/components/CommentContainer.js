
import { makeStyles } from "@material-ui/core";
import { Container, Grid } from "@material-ui/core";
import {useState} from "react"
import Comment from "./Comment";
import NewCommentForm from "./NewCommentForm";

const useStyles = makeStyles({
    grid: {
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: "20px"
    }
})

function CommentContainer({ user, comments, postId, commentType}) {
    const [updatedComments, setUpdatedComments] = useState(comments)
    console.log(updatedComments);
    const classes = useStyles();

    function handleFormSubmit(content) {
        const newComment = {
            postId: postId,
            author: user.username,
            profileImage: user.profileImage,
            content: content,
            likes: 0,
            dislikes: 0,
            likedUsers: [],
            dislikedUsers: []
        }
        fetch(`http://localhost:8000/${commentType}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        })
        .then(res => res.json())
        .then(data => setUpdatedComments((updatedComments) => [...updatedComments, data]))


    }
   
    return (
        <Container>
            <Grid
                className={classes.grid}
                container
                spacing={3}
            >
                {updatedComments.map((comment) => {
                    return (
                        <Grid
                            item
                            xs={12}
                            key={comment.id}
                        >
                            <Comment
                                author={comment.author}
                                content={comment.content}
                                profileImage={comment.profileImage}
                                lks={comment.likes}
                                dlks={comment.dislikes}
                                likedU={comment.likedUsers}
                                dislikedU={comment.dislikedUsers}
                                commentType={commentType}
                                id={comment.id}
                                user={user}
                            />
                        </Grid>
                    )
                })}
            </Grid>
            <NewCommentForm 
                handleFormSubmit={handleFormSubmit}
            />
        </Container>
    );
}

export default CommentContainer;