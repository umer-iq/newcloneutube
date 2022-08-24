
import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Card from '../components/Card'

const Container = styled.div`
display:flex;
justify-content:space-between;
flex-wrap:wrap;`
const Home = ({type}) => {
  const [videos, setVideos] = useState([])
  const {currentUser} = useSelector(state => state.user)
  useEffect(() => {
const fetchVideos = async () =>{

const res = await axios.get(`/api/videos/${type}`)



setVideos(res.data)
//console.log(type)
if(!currentUser){
  alert("Please Signin to see videos")
}
}
  fetchVideos()
   
  }, [type])

  //console.log(videos)


  return (
    <>
    <Container>
    {videos.map(video =>(<Card key={video._id} video={video}/>))}
   
    </Container>
    </>
  )
}

export default Home