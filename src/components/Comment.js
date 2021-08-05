import { Card, Box, CardContent, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import placeholderProfileImage from "../images/profile-image-placeholder.png";


const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column'
    },
    content: {
        flex: '1 0 auto'
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
    }
});

function Comment({ author, content, profileImage }) {
    const classes = useStyles();


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
            </Card>
        </div>
    );
}

export default Comment;