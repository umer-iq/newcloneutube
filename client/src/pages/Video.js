import React,{useState,useEffect} from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOffAltOutlinedIcon from "@mui/icons-material/ThumbDownOffAltOutlined";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import Comments from "../components/Comments";
import Card from "../components/Card";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { dislike, fetchSuccess, like } from "../redux/videoSlice";
import { format } from "timeago.js";
import { subscription } from "../redux/userSlice";
import Recommendation from "../components/Recommendation";


const Container = styled.div`
  display: flex;
  gap: 24px;
`;

const Content = styled.div`
  flex: 5;
`;
const VideoWrapper = styled.div``;

const Title = styled.h1`
  font-size: 18px;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
  color: ${({ theme }) => theme.text};
`;

const Details = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Info = styled.span`
  color: ${({ theme }) => theme.textSoft};
`;

const Buttons = styled.div`
  display: flex;
  gap: 20px;
  color: ${({ theme }) => theme.text};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;


const Channel = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ChannelInfo = styled.div`
  display: flex;
  gap: 20px;
`;

const Image = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const ChannelDetail = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.text};
`;

const ChannelName = styled.span`
  font-weight: 500;
`;

const ChannelCounter = styled.span`
  margin-top: 5px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.textSoft};
  font-size: 12px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const Subscribe = styled.button`
  background-color: #cc1a00;
  font-weight: 500;
  color: white;
  border: none;
  border-radius: 3px;
  height: max-content;
  padding: 10px 20px;
  cursor: pointer;
`;
const VideoFrame = styled.video`
  max-height: 720px;
  width: 100%;
  object-fit: cover;
`;

const Video = () => {
  const {currentUser} = useSelector(state => state.user)
  const {currentVideo} = useSelector(state => state.video)
  const path = useLocation().pathname.split("/")[2]
 
  const [channel, setChannel] = useState({})
  const [videouploader,setvideoUploader] = useState({})
 const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () =>{
      try{
        const videoRes = await axios.get(`/api/videos/find/${path}`)//it will show video data posted by userid
        const channelRes = await axios.get(`/api/users/find/${videoRes.data.userId}`)//it will show user data
        const channelViews = await axios.put(`/api/videos/view/${path}`)
        //console.log(videoRes)
        setvideoUploader(channelRes.data)
        //console.log(videouploader)
        setChannel(videoRes.data)
        dispatch(fetchSuccess(videoRes.data))
        //console.log(channelViews)
      }
      catch(err){}
    }
  
    fetchData()
  }, [dispatch, path,])
  
  //console.log(videouploader)
  const handleLike = async () => {
    await axios.put(`/api/users/like/${currentVideo._id}`)
    dispatch(like(currentVideo._id))
  }

  const handleDislikes = async () => {
    await axios.put(`/api/users/dislike/${currentVideo._id}`)
    dispatch(dislike(currentVideo._id))
  }
  const handleSub = async () => {
    currentUser.subscribedUsers.includes(channel._id)
      ? await axios.put(`/api/users/sub/${channel._id}`)
      : await axios.put(`/api/users/unsub/${channel._id}`);
      dispatch(subscription(channel._id));
    };

  //const videoSubscriber
  
  return (
    <Container  currentVideo={currentVideo} currentUser={currentUser}>
      <Content>
        <VideoWrapper>
        <VideoFrame src={channel.videoUrl} controls />
          {/* <iframe
            width="100%"
            height="720"
            src="https://www.youtube.com/embed/s2ofIa5zCcc"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe> */}
        </VideoWrapper>
       
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} views • {format(currentVideo.createdAt)}</Info>
          <Buttons>
            <Button onClick={handleLike}>
             {currentVideo.likes?.includes(currentUser._id) ? <ThumbUpIcon/> : <ThumbUpOutlinedIcon/>} {currentVideo.likes?.length}
            </Button>
            <Button onClick={handleDislikes}>
              {currentVideo.dislikes?.includes(currentUser._id) ? <ThumbDownIcon/> : <ThumbDownOffAltOutlinedIcon />}{currentVideo.dislikes?.length}
            </Button>
            <Button>
              <ReplyOutlinedIcon /> Share
            </Button>
            <Button>
              <AddTaskOutlinedIcon /> Save
            </Button>
          </Buttons>
        </Details>
        <Hr />
        <Channel>
          <ChannelInfo>
            <Image src={channel.img} />
            <ChannelDetail>
              <ChannelName>{channel.name}</ChannelName>
              <ChannelCounter>Subscribers:{videouploader.subscribers}</ChannelCounter>
              <Description>
                {currentVideo.desc}
              </Description>
            </ChannelDetail>
          </ChannelInfo>
          <Subscribe onClick={handleSub}>{currentUser.subscribedUsers?.includes(channel._id) ? "SUBSCRIBED":"SUBSCRIBE"}</Subscribe>
        </Channel>
        <Hr />
        <Comments videoId={currentVideo._id}/> 
      </Content>
     <Recommendation tags={currentVideo.tags}/>
    </Container>
  );
};

export default Video;