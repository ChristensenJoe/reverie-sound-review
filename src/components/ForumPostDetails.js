import { useHistory } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/w3.css"
import {  Button } from "@material-ui/core"


function ForumPostDetails ({data, user}) {
    const history = useHistory();
    
    if(!user) {
        history.push("/")
    }

    console.log(data)
    
    return (
       <>
                <NavBar user={user}/>
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
                <div style={{ marginRight: "100px", marginLeft: "100px" }}>{data.article.content}</div>
                <br></br>
                <br></br>
      </>   
    )
}

export default ForumPostDetails