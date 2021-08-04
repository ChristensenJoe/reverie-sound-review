import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from "@material-ui/core"
import theme from "../styles/theme"
import '../styles/w3.css'

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

function randomImage(){

  let randomNumber = Math.floor(Math.random() * 100)
  console.log('hi')

  
    return `https://picsum.photos/300/200?random=${randomNumber}`

}
function NewsCard({ data }) {
  const classes = useStyles();
  const { title, author, content } = data
  return (
   
    <div class="w3-card-4 w3-animate-zoom">
      <img class="w3-border w3-border-black" height='50%' width='100%' src={randomImage()} alt="randomImage" />
      <div class="w3-container w3-center w3-border w3-border-black" style={{height:'100px', overflow: 'scroll', backgroundColor: "#161a1d"}}>
        {author ? <p class="w3-text-light-gray w3-opacity">{author}</p>: <p>No Author</p>}
        <p class="w3-text-light-grey" style={{textShadow:"1px 1px 0 #444", marginBottom: '30px'}}>{title}</p>
      </div>
    </div>
    
    
    
        );
}
        export default NewsCard