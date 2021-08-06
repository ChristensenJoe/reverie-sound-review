import { useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { Box, Grid, Button, Container } from "@material-ui/core"
import SearchBar from "material-ui-search-bar";
import NewsCard from "./NewsCard";
import '../styles/w3.css'

function News({ user, setSelectedNewsData }) {
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
        if (search.value !== "") {
            /**fetch(`https://newsapi.org/v2/everything?q=(classical%20AND%20${search.value.toLowerCase()})&apiKey=${API_KEY}&pageSize=10&page=${pageNumber}`) */
            fetch(`${process.env.REACT_APP_API_URL}/articles/?q=${search.value.toLowerCase()}&_page=${pageNumber}`)
                .then(res => res.json())
                .then(data => {
                    if (isMounted) {
                        if (data.length > 0) {
                            setNewsData(data)
                            console.log(newsData);
                        }
                        else {
                            if (pageNumber !== 1) {
                                setPageNumber((pageNumber) => pageNumber - 1)
                                alert("You are on the last page")
                            }
                        }
                    }
                });
        }
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

    function randomImage() {

        let randomNumber = Math.floor(Math.random() * 100)


        return `https://picsum.photos/300/200?random=${randomNumber}`

    }

    return (
        <div>
            <NavBar user={user} />
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
                    marginTop="20px"
                    margin="20px"
                    display="flex"
                    alignItems="top"
                    justifyContent="top"
                    overflow="hidden"
                    textAlign="center"
                >
                    <Grid container spacing={4}>
                        {
                            newsData.map((data) => {
                                let image = randomImage();
                                return (
                                    <Grid item xs={4}
                                        key={data.url}
                                    >
                                        <Link
                                            to="/newsdetails"
                                            onClick={() => { setSelectedNewsData({ article: data, image: image }) }}
                                        >
                                            <NewsCard data={data} image={image} />
                                        </Link>
                                    </Grid>
                                )
                            })
                        }
                        <Grid item xs={12}>
                            {newsData.length > 0 &&
                                <>
                                    <Button
                                        name="previous"

                                        variant="contained"
                                        color="primary"
                                        style={{
                                            float: "left",
                                            margin: "10px",
                                            background: "#ff7b00"
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
                                            margin: "10px",
                                            background: "#ff7b00"
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