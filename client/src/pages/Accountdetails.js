import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Card from '../components/Card';
import { async } from '@firebase/util';

const Container = styled.div`
display:flex;
justify-content:space-between;
flex-wrap:wrap;`
const Button = styled.button`

padding:5px 15px;
background-color: transparent;
border:1px solid #3ea6ff;
color:#3ea6ff;
border-radius:10px;
font-weight:500;
margin-top: 0px;


cursor: pointer;
width: 40px;
height: 30px;
display: flex;
align-items: center;
gap: 35px;
`;
const Accountdetails = () => {
  const [videos, setVideos] = useState([])
  const {currentUser} = useSelector(state => state.user)
const [filterbyuser, setfilterbyuser] = useState([])
  useEffect(() => {
    const fetchVideos = async () =>{
        const res = await axios.get(`/videos/uservideos/${currentUser._id}`);
        setVideos(res.data)
    }
    
    fetchVideos();
    
    
}, [currentUser._id])

//console.log(videos)
const found =  videos.filter((e) =>{
    return e.userId === currentUser._id
} 

 )
//setfilterbyuser(found)
 //console.log(found)

  const delVideo = async() => {
     
         await axios.delete(`/videos/del/${currentUser._id}`);
       
    
  }  


  
    return (
    <Container>
        {found.map((video) => (
            <><Card key={video._id} video={video} />
            <Button key={video._id} onClick={async() => {
     
     await axios.delete(`/videos/del/${video._id}`);
   return alert('video has been deleted refresh the page')

}  }>Del</Button></>
        ))}
    </Container>
  )
}

export default Accountdetails