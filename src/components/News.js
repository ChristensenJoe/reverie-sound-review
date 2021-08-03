import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Box, Grid, Button, Container, Card, CardContent, Typography } from "@material-ui/core"
import SearchBar from "material-ui-search-bar";

function News({ user }) {
    const API_KEY = "ed1ad5bc580d4542b0e4eccb9fc42a26";
    const [newsData, setNewsData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [search, setSearch] = useState({
        value: ""
    });
    const history = useHistory();

    if (!user) {
        history.push("/");
    }

    useEffect(() => {
        let isMounted = true;
        fetch(`https://newsapi.org/v2/everything?q=classical&apiKey=${API_KEY}&pageSize=100`)
            .then(res => res.json())
            .then(data => {
                if(isMounted) setNewsData(data.articles)
            });
            return () => {isMounted=false}
    }, [])

    const filteredNewsData = newsData.filter((data) => {
        if((data.title.toLowerCase().includes(search.value.toLowerCase()))) return true;
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
                onChange={(newValue) => setSearch({ value: newValue })}
            />
            <Container>
                <Box
                    border="solid 2px"
                    marginTop="100px"
                    margin="20px"
                    display="flex"
                    alignItems="top"
                    justifyContent="top"
                    overflow="hidden"
                    textAlign="center"
                >
                    <Grid container spacing={3}>
                    {
                            filteredNewsData.map((data) => {
                                return (
                                    <Grid item xs={12}
                                    key={data.url}
                                    >
                                        {/** Add Card Here */}
                                        <h2>{data.title}</h2>
                                    </Grid>
                                )
                            })
                        }
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}

export default News;