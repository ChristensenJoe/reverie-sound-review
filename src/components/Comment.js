import { Box, Container } from "@material-ui/core";

function Comment({ author, content }) {
    console.log(author)
    return (
        <>
            <Container>
                <Box
                    textAlign="center"
                >
                    <h3>{content}</h3>
                </Box>
                <Box
                    textAlign="center"
                >
                    <h4>{author}</h4>
                </Box>
            </Container>
        </>
    );
}

export default Comment;