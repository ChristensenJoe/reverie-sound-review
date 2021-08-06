import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import CommentContainer from "./CommentContainer";
import "../styles/w3.css"



function ForumPostDetails({ data, user }) {
    const [postComments, setPostComments] = useState(null);
    const history = useHistory();

    let filteredComments = [];

    if (!user) {
        history.push("/")
    }

    useEffect(() => {
        let isMounted = true;
        fetch(`${process.env.REACT_APP_API_URL}/postcomments`)
            .then(res => res.json())
            .then(data => {
                if (isMounted) {
                    setPostComments(data);
                }
            });
        return () => { isMounted = false }
    }, [])

    if (postComments) {
        filteredComments = postComments.filter((comment) => {
            if (comment.postId === data.article.id) return true;
            return false;
        })
    }

    return (
        <>
            <NavBar user={user} />
            <header className="bgimg w3-display-container w3-grayscale-min" id="home" >
                <div>
                    <img height="100%" width="100%" src='https://cdn.pixabay.com/photo/2018/03/31/23/27/people-3279617_1280.jpg' alt="hi" />
                </div>

                <div className="w3-display-middle w3-center w3-black w3-card-4">
                    <span className="w3-text-white" style={{ fontSize: "30px" }}>{data.article.title}</span>
                </div>
                <div className="w3-display-bottommiddle w3-center w3-padding-large w3-black">
                    <span className="w3-text-white" style={{ fontSize: "20px" }}>Author: {data.article.author}</span>
                </div>
            </header>

            <div className="w3-sand w3-grayscale w3-large"></div>

            <div className="w3-container" id="about">
                <h5 className="w3-center w3-padding-64"><span className="w3-tag w3-wide w3-orange">SYNOPSIS</span></h5>
            </div>
            <div style={{ textAlign: "center" }}>{data.article.content}</div>
            <br></br>
            <br></br>
            <div className="w3-container" id="about">
                <h5 className="w3-center w3-padding-64"><span className="w3-tag w3-wide w3-orange">COMMENTS</span></h5>
            </div>
            <br></br>
            {
                postComments
                &&
                <CommentContainer
                    postId={data.article.id}
                    user={user}
                    comments={filteredComments}
                    commentType={"postcomments"}
                />
            }
        </>
    )
}

export default ForumPostDetails