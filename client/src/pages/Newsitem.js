
import React  from 'react';

const Newsitem = (props) => {
   
        let   {title,description,imageURL,content,author,date} = props;
        
        return (
         
            <div className='my-3'>
             <div className="card" >
  <img src= {imageURL?imageURL:"https://i.kinja-img.com/gawker-media/image/upload/c_fill,f_auto,fl_progressive,g_center,h_675,pg_1,q_80,w_1200/6538d75386707cee1b4903c06d0c631f.jpg"} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}</h5>
    <p className="card-text">{description}</p>
    <p className="card-text"><small className="text-muted">By: {!author?"Unknown": author} on: {date}</small></p>
    <a href={content} target="_blank" className="btn  btn-sm btn-primary" rel="noopener noreferrer">Read More</a>
           </div>
           </div>  
           </div>
        );
    }


export default Newsitem;