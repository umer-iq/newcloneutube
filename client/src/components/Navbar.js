import React,{useState} from 'react'
import styled from 'styled-components'
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { SearchOutlined} from '@mui/icons-material';
import Upload from './Upload';
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
const Container = styled.div`
position:sticky;
top:0;
background-color:${({theme}) => theme.bgLighter};
height:56px;`

const Wrapper = styled.div`
display:flex;
align-items: center;
justify-content: flex-end;
height:100%;
padding:10px;
position:relative;`

const Search = styled.div`
position:absolute;
width: 20%;
left: 0px;
right: 200px;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 3px;
margin-top: -15px;
color:${({theme}) => theme.text};
`

const Input = styled.input`
border:none;
background-color:transparent;
width: 100%;

`

const Button = styled.button`
padding:5px 15px;
background-color: transparent;
border:1px solid #3ea6ff;
color:#3ea6ff;
border-radius:10px;
font-weight:500;
margin-top: -10px;


cursor: pointer;
width: 80px;
height: 30px;
display: flex;
align-items: center;
gap: 35px;
`
const Button1 = styled.button`
padding:5px 15px;
background-color: transparent;
border:1px solid #3ea6ff;
color:#3ea6ff;
border-radius:10px;
font-weight:500;
margin-top: -10px;


cursor: pointer;
width: 80px;
height: 30px;
display: flex;
align-items: center;
gap: 35px;
`
const User = styled.div`
display:flex;
align-items:center;
gap:10px;
font-weight:500;
color:${({theme}) => theme.text};`

const Avatar = styled.img`
width: 35px;
height: 35px;
border-radius: 50%;
background-color:#999;
`

const Navbar = () => {
  const dispatch = useDispatch()
  const {currentUser} = useSelector(state => state.user)
  const [open, setOpen] = useState(false)
  const [q, setQ] = useState("")
  const navigate = useNavigate();
  const handleLogout =  (e) =>{
    e.preventDefault();
    dispatch(logout())
    navigate('/signin')

    //alert("submitted");
    
  }
  return (
    <>
    
   <Container>
    <Wrapper>
      <Search>
        <Input placeholder='Search' onChange={e=>setQ(e.target.value)}/>
        <SearchOutlined onClick={() =>navigate(`/search?q=${q}`)}/>
      </Search>
      {currentUser ? (
        
        <User>
        <Button1 onClick={handleLogout}>SIGNOUT</Button1>
        <VideoCallOutlinedIcon onClick={()=>setOpen(true)}/>
        <Link to="accountdetails" style={{ textDecoration: "none",color:"inherit" }}>
        <Avatar src={currentUser.img}/> 
        </Link>
        {currentUser.name}
      </User>):(<Link to="signin" style={{textDecoration:"none"}}>
        <Button>
         {/* <AccountCircleOutlinedIcon /> */}
          SIGNIN
        </Button>
        </Link>)}
       
    </Wrapper>
   </Container>
   {open && <Upload setOpen={setOpen}/>}
   </>
   )
}

export default Navbar