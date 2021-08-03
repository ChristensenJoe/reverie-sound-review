import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from "@material-ui/core"
import theme from "../styles/theme"
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
function NewsCard({data}) {
  const classes = useStyles();
  const {title, author, content} = data
  return (
    <Card className={classes.root}>
      <CardContent style={{background: "#bd632f"}}>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {author}
        </Typography>
        <Typography variant="h7" component="h2">
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default NewsCard