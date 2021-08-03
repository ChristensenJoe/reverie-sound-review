import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Grid, Box, Container } from "@material-ui/core"
import NavBar from "./NavBar";
import SearchBar from "material-ui-search-bar";

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
        fetch("http://localhost:8000/posts")
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])

    const filteredPosts = posts.filter((post) => {
        if(search.value==="") return false;
        if(post.title.toLowerCase().includes(search.value.toLowerCase())) return true;
        return false;
    })


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
                        setSearch({value: ""});
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
                            filteredPosts.map((post) => {
                                return (
                                    <Grid
                                        item
                                        xs={12}
                                        key={post.id}
                                    >
                                        <h2>{post.title}</h2>
                                    </Grid>
                                );
                            })
                        }
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default Forums;