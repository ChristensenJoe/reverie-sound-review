import { TextField, Container, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import {useState} from "react";

const useStyles = makeStyles({
    form: {
        width: "85%",
        marginLeft: "auto",
        marginRight: "auto"
    },
    field: {
        marginTop: "10px",
        marginBottom: "10px"
    }
});

function NewCommentForm({handleFormSubmit}) {
    const classes = useStyles();

    const [newComment, setNewComment] = useState("")
    const [commentError, setCommentError] = useState(false);

    function onSubmitForm(e) {
        e.preventDefault();
        setCommentError(false);
        if(newComment === "") setCommentError(true);
        else {
            handleFormSubmit(newComment);
            setNewComment("");
        }
    }
    return (
        <Container>
            <form 
            className={classes.form}
            noValidate
            onSubmit={onSubmitForm}
            >
                <TextField 
                    className={classes.field}
                    onChange={(e) => setNewComment(e.target.value)}
                    label="Comment"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    required
                    name="content"
                    multiline
                    rows={4}
                    value={newComment}
                    error={commentError}
                />

                <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                >
                    Submit
                </Button>
            </form>
        </Container>
    )
}

export default NewCommentForm;