import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid, Box, Container, Button } from "@material-ui/core"
import NavBar from "./NavBar";
import SearchBar from "material-ui-search-bar";
import NewsCard from "./NewsCard"

function Forums({ user }) {
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
            fetch(`http://localhost:8000/posts?_page=${pageNumber}&q=${search.value.toLowerCase()}`)
                .then(res => res.json())
                .then(data => {
                    if(isMounted) {
                        if(data.length > 0) {
                            setPosts(data)
                        }
                        else {
                            setPosts([]);
                            setPageNumber((pageNumber) => pageNumber-1);
                            alert("You are on the last page");
                        }
                    }
                })
        }
        return () => { isMounted = false }
    }, [pageNumber, search])


    console.log(pageNumber);

    function onNextClick() {
        setPageNumber((pageNumber) => pageNumber+1)
    }

    function onPreviousClick() {
        if(pageNumber > 1) setPageNumber((pageNumber) => pageNumber-1);
        else alert("You are on the first page!")
    }

    return (
        <div>
            <NavBar />
            <SearchBar
                style={{
                    marginTop: "20px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    width: "80%"
                }}
                value={search.value}
                onCancelSearch={
                    () => {
                        setSearch({ value: "" });
                    }
                }
                onRequestSearch={
                    (newValue) => {
                        setSearch({ value: newValue })
                    }
                }
            />
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
                                return (
                                    <Grid
                                        item
                                        xs={4}
                                        key={post.id}
                                    >
                                        <NewsCard data={post}/>
                                        
                                    </Grid>
                                );
                            })
                        }

                        <Grid item xs={12}>
                            {posts.length > 0 &&
                                <>
                                    <Button
                                        name="previous"
                                        disableElevation
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
                                        disableElevation
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