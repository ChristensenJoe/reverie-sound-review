import {Button, Container, Box} from "@material-ui/core"

function Header() {
    return (
        <Container >
            <h1>Reverie Sound Review</h1>
            <div>
                <Box mx="px">
                <Button  color="primary">News</Button>
                <Button color="primary">Forum</Button>
                </Box>
            </div>
        </Container>
    )
}

export default Header