import Card from './Card';
import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex: 2;
`;
const Recommendation = ({tags}) => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () =>{
        const res = await axios.get(`/api/videos/tags?tags=${tags}`);
        setVideos(res.data)

    }
    
  fetchVideos();
    
    
  }, [tags])
  
  //console.log(videos)
  
    return (
    <Container>
        {videos.map((video) => (
            <Card type='small' key={video._id} video={video}/>
        ))}
    </Container>
  )
}

export default Recommendation