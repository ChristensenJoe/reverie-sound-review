import { useHistory } from "react-router-dom";
import {useState, useEffect} from "react";
import NavBar from "./NavBar";
import "../styles/w3.css"
import { Button } from "@material-ui/core"

import CommentContainer from "./CommentContainer"

function NewsDetails({ user, data }) {
    const [articleComments, setArticleComments] = useState(null);
    const history = useHistory();

    if (!user) {
        history.push("/")
    }

    const { article } = data
    let filteredComments = [];
    useEffect(() => {
        let isMounted = true;
        fetch(`${process.env.REACT_APP_API_URL}/articlecomments`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setArticleComments(data);
                }
            });
        return () => { isMounted = false }
    }, [])
    
    if(articleComments) {
        filteredComments = articleComments.filter((comment) => {
            if(comment.postId === article.url) return true;
            return false;
        })
    }
    
    return (
        <>
            
                <NavBar user={user}/>
                <header className="bgimg w3-display-container w3-grayscale-min" id="home" >
                    <div>
                        <img height="100%" width="100%" src='https://cdn.pixabay.com/photo/2018/03/31/23/27/people-3279617_1280.jpg' alt="hi" />
                    </div>

                    <div className="w3-display-middle w3-center w3-black w3-card-4">
                        <span className="w3-text-white" style={{ fontSize: "30px" }}>{article.title}</span>
                    </div>
                    <div className="w3-display-bottommiddle w3-center w3-padding-large w3-black">
                        <span className="w3-text-white" style={{ fontSize: "20px" }}>Author: {article.author}</span>
                    </div>
                </header>

                <div className="w3-sand w3-grayscale w3-large"></div>

                <div className="w3-container" id="about">
                    <h5 className="w3-center w3-padding-64"><span className="w3-tag w3-wide w3-orange">SYNOPSIS</span></h5>
                </div>
                <div style={{ marginRight: "100px", marginLeft: "100px" }}>{article.content.split("[")[0]}</div>
                <br></br>
                <br></br>
                <Button
                    className="w3-display-bottommiddle"
                    variant="contained"
                    color="primary"
                    onClick={() => {window.location.href = article.url;}}
                >Continue Reading
                </Button>
                <br></br>
                <br></br>
                <div className="w3-container" id="about">
                    <h5 className="w3-center w3-padding-64"><span className="w3-tag w3-wide w3-orange">COMMENTS</span></h5>
                </div>
                <br></br>
                {
                    articleComments &&
                    <CommentContainer 
                    postId={article.url}
                    user={user}
                    comments={filteredComments}
                    commentType={"articlecomments"}
                />
                }
            

        </>
    );
}

export default NewsDetails;