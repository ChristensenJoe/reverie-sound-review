import { Card, Box, CardContent, Typography, Divider, IconButton, } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { useState } from "react";
import placeholderProfileImage from "../images/profile-image-placeholder.png";
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto',
        alignItems: "stretch"
    },
    divider: {
        width: "2px"
    },
    author: {
        display: "flex",
        alignItems: "flex-end"
    },
    image: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    buttons: {
        marginRigth: "10px"
    }
});

function Comment({ author, content, profileImage, lks, dlks, likedU, dislikedU, commentType, id, user }) {
    const classes = useStyles();

    const [likes, setLikes] = useState(lks)
    const [dislikes, setDislikes] = useState(dlks)
    const [isLiked, setIsLiked] = useState(likedU.includes(user.username));
    const [isDisliked, setIsDisliked] = useState(dislikedU.includes(user.username));
    const [likedUsers, setLikedUsers] = useState(likedU)
    const [dislikedUsers, setDislikedUsers] = useState(dislikedU);

    function onLikeClick() {
        const filteredDislikedUsers = dislikedUsers.filter((username) => {
            if(username === user.username) return false;
            return true;
        })
        const filteredLikedUsers = likedUsers.filter((username) => {
            if(username === user.username) return false;
            return true;
        })

        if (!isLiked) {
            if (isDisliked) {
                fetch(`http://localhost:8000/${commentType}/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: likes + 1,
                        disliked: dislikes - 1,
                        dislikedUsers: filteredDislikedUsers,
                        likedUsers: [...likedUsers, user.username]
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setLikes((likes) => likes + 1);
                        setDislikes((dislikes) => dislikes - 1);
                        setIsLiked(true);
                        setIsDisliked(false);
                        setDislikedUsers(filteredDislikedUsers);
                        setLikedUsers((likedUsers) => [...likedUsers, user.username]);
                    })
            }
            else {
                fetch(`http://localhost:8000/${commentType}/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: likes + 1,
                        likedUsers: [...likedUsers, user.username]
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setLikes((likes) => likes + 1);
                        setIsLiked(true);
                        setLikedUsers((likedUsers) => [...likedUsers, user.username]);
                    })
            }
        }
        else {
            fetch(`http://localhost:8000/${commentType}/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: likes - 1,
                        likedUsers: filteredLikedUsers
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setIsLiked(false);
                        setLikes((likes) => likes-1);
                        setLikedUsers(filteredLikedUsers);
                    })
        }
    }

    function onDislikeClick() {
        const filteredLikedUsers = likedUsers.filter((username) => {
            if(username === user.username) return false;
            return true;
        })
        const filteredDislikedUsers = dislikedUsers.filter((username) => {
            if(username === user.username) return false;
            return true;
        })

        if (!isDisliked) {
            if (isLiked) {
                fetch(`http://localhost:8000/${commentType}/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        likes: likes - 1,
                        disliked: dislikes + 1,
                        likedUsers: filteredLikedUsers,
                        dislikedUsers: [...dislikedUsers, user.username]
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setLikes((likes) => likes - 1);
                        setDislikes((dislikes) => dislikes + 1);
                        setIsLiked(false);
                        setIsDisliked(true);
                        setLikedUsers(filteredLikedUsers);
                        setDislikedUsers((dislikedUsers) => [...dislikedUsers, user.username]);
                    })
            }
            else {
                fetch(`http://localhost:8000/${commentType}/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dislikes: dislikes + 1,
                        dislikedUsers: [...dislikedUsers, user.username]
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setDislikes((dislikes) => dislikes + 1);
                        setIsDisliked(true);
                        setDislikedUsers((dislikedUsers) => [...dislikedUsers, user.username]);
                    })
            }
        }
        else {
            fetch(`http://localhost:8000/${commentType}/${id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        dislikes: dislikes - 1,
                        dislikedUsers: filteredDislikedUsers
                    })
                })
                    .then(res => res.json())
                    .then(data => {
                        setIsDisliked(false);
                        setDislikes((dislikes) => dislikes-1);
                        setDislikedUsers(filteredDislikedUsers);
                    })
        }
    }

    return (
        <div>
            <Card className={classes.root}>
                <CardContent className={classes.image}>
                    <Box
                        border={1}
                        borderRadius="50%"
                        overflow="hidden"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="80px"
                        width="80px"
                    >
                        <img
                            style={{
                                width: "100%",
                                height: "auto"
                            }}
                            src={(profileImage === "") ? placeholderProfileImage : profileImage}
                            alt="profile"
                        />
                    </Box>
                </CardContent>
                <Divider
                    light
                    flexItem
                    className={classes.divider}
                    orientation="vertical"
                />
                <div style={{ justifyContent: "space-between" }}>
                    <div className={classes.details}>
                        <CardContent className={classes.content}>
                            <Typography variant="body1">
                                {content}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" className={classes.author}>
                                {`- ${author}`}
                            </Typography>
                        </CardContent>
                    </div>
                    <CardContent>
                        <IconButton size="small" color="primary" className={classes.buttons} onClick={onLikeClick}>
                            {likes}
                            {isLiked ? <ThumbUpIcon style={{ marginLeft: "10px" }} /> : <ThumbUpOutlinedIcon style={{ marginLeft: "10px" }} />}
                        </IconButton>
                        <IconButton size="small" color="primary" className={classes.buttons} onClick={onDislikeClick}>
                            {dislikes}
                            {isDisliked ? <ThumbDownIcon style={{ marginLeft: "10px" }} /> : <ThumbDownOutlinedIcon style={{ marginLeft: "10px" }} />}
                        </IconButton>
                    </CardContent>
                </div>
            </Card>
        </div>
    );
}

export default Comment;