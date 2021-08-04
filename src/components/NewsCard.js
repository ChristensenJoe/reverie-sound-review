import React from 'react';
import '../styles/w3.css'


function NewsCard({ data, image }) {
  const { title, author } = data
  return (
   
    <div className="w3-card-4 w3-animate-zoom">
      <img className="w3-border w3-border-black" height='50%' width='100%' src={image} alt="randomImage" />
      <div className="w3-container w3-center w3-border w3-border-black" style={{height:'100px', overflow: 'scroll', backgroundColor: "#161a1d"}}>
        {author ? <p className="w3-text-light-gray w3-opacity">{author}</p>: <p>No Author</p>}
        <p className="w3-text-light-grey" style={{textShadow:"1px 1px 0 #444", marginBottom: '30px'}}>{title}</p>
      </div>
    </div>
    
    
    
        );
}
        export default NewsCard