import { useHistory } from "react-router-dom";
import { Container, Grid, Box } from "@material-ui/core";
import NavBar from "./NavBar";

function NewsDetails({ user, article }) {
    const history = useHistory();

    if (!user) {
        history.push("/")
    }

    console.log(article);
    return (
        <>
            <NavBar />
            <Container>
                <Grid container spacing={3}>
                    <Grid
                        style={{
                            margin: "30px",
                            border: "solid 2px",
                            height: "800px",

                        }}
                        item
                        xs={12}
                    >

                        <Grid container >

                            <Grid
                                item
                                xs={12}
                                style={{
                                    textAlign: "center"
                                }}
                            >
                                <Box
                                    border={1}
                                    borderRadius={16}
                                    overflow="hidden"
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    height="400px"
                                >
                                    <img
                                        src={article.urlToImage}
                                        alt="news" />
                                </Box>

                                <Box
                                    textAlign="center"
                                >
                                    <h1>{article.title}</h1>
                                </Box>

                                <Box
                                    textAlign="center"
                                >
                                    <h6>{article.author}</h6>
                                </Box>
                            </Grid>

                            <Grid item xs={12}>
                                <h6>Details</h6>
                            </Grid>


                        </Grid>

                    </Grid>
                    <Grid
                        style={{
                            margin: "30px",
                            border: "solid 2px",
                            height: "300px",

                        }}
                        item
                        xs={12}
                    >

                    </Grid>
                </Grid>
            </Container>
        </>
    );
}

export default NewsDetails;