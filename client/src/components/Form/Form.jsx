import React,{useState, useEffect} from 'react'
import {TextField, Button, Typography, Paper} from "@mui/material"
import FileBase from "react-file-base64"
import {useDispatch,useSelector} from "react-redux"
import useStyles from "./styles";
import { useNavigate } from 'react-router-dom';
import {createPost, updatePost} from "../../actions/posts"

 const Form = ({currentId,setCurrentId}) => {
  const [postData, setPostData]=useState({
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  })
  const post=useSelector((state)=>currentId? state.posts.posts.find((p)=>p._id===currentId):null);
  // console.log(post)

  const dispatch=useDispatch();
  const classes= useStyles();
  const user= JSON.parse(localStorage.getItem('profile'));
  const navigate=useNavigate();

  useEffect(()=>{
    if(post) setPostData(post);
  },[post])
  
  const handleSubmit=async (e)=>{
    e.preventDefault();
    // console.log(postData);
    if(currentId===0){
      dispatch(createPost({...postData, name:user?.result?.name},navigate));
      clear();
    }else{
      dispatch(updatePost(currentId,{...postData,name: user?.result?.name}));
      clear();
      }  
  };
  if(!user?.result?.name){
    return (
      <Paper style={classes.paper}>
        <Typography variant='h6' align='center'>
          Please Sign In to create your own memory and likes other's memory.
        </Typography>
      </Paper>
    )
  }
  const clear=()=>{
    setCurrentId(0);
    setPostData({
    title:'',
    message:'',
    tags:'',
    selectedFile:''
    })
  }
  return (
    <Paper style={classes.paper} elevation={6}>
      <form autoComplete='off' noValidate sx={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography varient="h6">{currentId? 'Editing':"Creating"} a Memory</Typography>
          <TextField 
        name='title' 
        variant='outlined' 
        label='title'
        fullWidth
        value={postData.title}
        onChange={(e)=>setPostData({...postData,title:e.target.value})}
        />
          <TextField 
        name='message' 
        variant='outlined' 
        label='message'
        fullWidth
        value={postData.message}
        onChange={(e)=>setPostData({...postData,message:e.target.value})}
        />
          <TextField 
        name='tags' 
        variant='outlined' 
        label='tags'
        fullWidth
        value={postData.tags}
        onChange={(e)=>setPostData({...postData,tags:e.target.value.split(',')})}
        />
        <div style={classes.fileInput}>
          <FileBase
          type="file"
          name="file"
          multiple={false}
          onDone={({base64})=> setPostData({...postData,selectedFile:base64})}>
          </FileBase>
        </div>
        <Button style={classes.buttonSubmit} color='primary' variant='contained' size='large' type='submit' fullWidth>Submit</Button>
        <Button variant='contained' color='secondary' size='large' onClick={clear} fullWidth>Clear</Button>
      </form>
    </Paper>
  )
}
export default Form;