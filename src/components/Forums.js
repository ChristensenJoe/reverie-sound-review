import { useHistory, NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid, Box, Container, Button } from "@material-ui/core"
import NavBar from "./NavBar";
import SearchBar from "material-ui-search-bar";
import NewsCard from "./NewsCard"

function Forums({ user, setSelectedForumData }) {
    const [posts, setPosts] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState({
        value: ""
    })
    const history = useHistory();
    if (!user) {
        history.push("/");
    }

    useEffect(() => {
        let isMounted = true;
        if (search.value === "") {
            setPosts([]);
        }
        else {
            fetch(`${process.env.REACT_APP_API_URL}/posts?_page=${pageNumber}&q=${search.value.toLowerCase()}`)
                .then(res => res.json())
                .then(data => {
                    if (isMounted) {
                        if (data.length > 0) {
                            setPosts(data)
                        }
                        else {
                            setPosts([]);
                            if (pageNumber > 1) {
                                setPageNumber((pageNumber) => pageNumber - 1);
                                alert("You are on the last page");
                            }
                        }
                    }
                })
        }
        return () => { isMounted = false }
    }, [pageNumber, search])



    function onNextClick() {
        setPageNumber((pageNumber) => pageNumber + 1)
    }

    function onPreviousClick() {
        if (pageNumber > 1) setPageNumber((pageNumber) => pageNumber - 1);
        else alert("You are on the first page!")
    }

    function randomImage() {

        let randomNumber = Math.floor(Math.random() * 100)


        return `https://picsum.photos/300/200?random=${randomNumber}`

    }

    return (
        <div>
            <NavBar user={user} />
            <Container style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "50px"
                    }}>
                <SearchBar
                    style={{
                        marginLeft: "auto",
                        marginRight: "auto",
                        width: "80%",
                    }}
                    value={search.value}
                    onCancelSearch={
                        () => {
                            setSearch({ value: "" });
                            setPageNumber(1);
                        }
                    }
                    onRequestSearch={
                        (newValue) => {
                            setSearch({ value: newValue })
                            setPageNumber(1);
                        }
                    }

                />
                <Button
                    component={NavLink}
                    to="/newforumpost"
                    style={{ backgroundColor: "#ff5722", color: "white"}}
                >Create Post
                </Button>
            </Container>

            <Container>
                <Box
                    marginTop="40px"
                    margin="20px"
                    display="flex"
                    alignItems="top"
                    justifyContent="top"
                    overflow="hidden"
                    textAlign="center"
                >
                    <Grid container spacing={3}>
                        {
                            posts.map((post) => {
                                let image = randomImage();
                                return (
                                    <Grid
                                        item
                                        xs={4}
                                        key={post.id}
                                    >
                                        <Link
                                            to="/postdetails"
                                            onClick={() => { setSelectedForumData({ article: post, image: image }) }}>
                                            <NewsCard data={post} image={image} />
                                        </Link>

                                    </Grid>
                                );
                            })
                        }

                        <Grid item xs={12}>
                            {posts.length > 0 &&
                                <>
                                    <Button
                                        name="previous"

                                        variant="contained"
                                        color="primary"
                                        style={{
                                            float: "left",
                                            margin: "10px"
                                        }}
                                        onClick={onPreviousClick}
                                    >
                                        Previous Page
                                    </Button>
                                    <Button
                                        name="next"

                                        variant="contained"
                                        color="primary"
                                        style={{
                                            float: "right",
                                            margin: "10px"
                                        }}
                                        onClick={onNextClick}
                                    >
                                        Next Page
                                    </Button>
                                </>}
                        </Grid>

                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default Forums;