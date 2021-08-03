import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Box, Grid, Button, ButtonGroup, Container } from "@material-ui/core"
import SearchBar from "material-ui-search-bar";
import NewsCard from "./NewsCard";

function News({ user }) {
    const API_KEY = "f71564ed3c8b4f5587814c89dc49ff6a";
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
        fetch(`https://newsapi.org/v2/everything?q=(classical%20AND%20${search.value.toLowerCase()})&apiKey=${API_KEY}&pageSize=10&page=${pageNumber}`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    if ((data.status === "ok") && (data.articles.length > 0)) {
                        setNewsData(data.articles)
                    }
                    else {
                        if (pageNumber !== 1) {
                            setPageNumber((pageNumber) => pageNumber - 1)
                            alert("You are on the last page")
                        }
                    }
                }
            });
        return () => { isMounted = false }
    }, [search, pageNumber])

    function onNextClick() {
        setPageNumber((pageNumber) => pageNumber + 1);
    }

    function onPreviousClick() {
        if (pageNumber > 1) {
            setPageNumber((pageNumber) => pageNumber - 1);
        }
        else {
            alert("You are on the first page");
        }
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
                        setPageNumber(1);
                        setSearch({ value: "" });
                        setNewsData([]);
                    }
                }
                onRequestSearch={
                    (newValue) => {
                        setPageNumber(1);
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
                            newsData.map((data) => {
                                return (
                                    <Grid item xs={12}
                                        key={data.url}
                                    >
                                        <NewsCard data={data} />
                                    </Grid>
                                )
                            })
                        }
                        <Grid item xs={12}>
                            {newsData.length > 0 &&
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

export default News;