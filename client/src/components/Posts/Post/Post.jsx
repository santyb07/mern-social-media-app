import React,{useState} from 'react'
import {Card, CardActions, CardContent, CardMedia,Button, ButtonBase, Typography} from "@mui/material"
import {ThumbUpAlt, Delete,MoreHoriz, ThumbUpAltOutlined} from "@mui/icons-material"
import moment from "moment"
import {useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import {deletePost,likePost} from "../../../actions/posts"


import useStyles from "./styles";


const Post = ({post, setCurrentId}) => {
      const classes= useStyles();
      const dispatch=useDispatch();
      const navigate=useNavigate();
      const [likes, setLikes]=useState(post?.likes);
      const user= JSON.parse(localStorage.getItem('profile'));

      const userId= user?.result.googleId || user?.result?._id;
      const hasLikedPost=likes.find((like)=> like === userId);
      
      const handleLike= async()=>{
            dispatch(likePost(post._id))
            if(hasLikedPost){
                  setLikes(likes.filter((id)=> id!==userId));
            }else{
                  setLikes([...likes,userId]);
            }     
      };
      const Likes = () =>{
            if(likes.length > 0){
                  return likes.find((like)=> like === userId)
                  ?(
                        <><ThumbUpAlt fontSize='small'/>&nbsp;{likes.length > 2 ? `You and ${likes.length -1} others`: `${likes.length} like${likes.length >1 ? 's':''}` }</>
                  ):(
                        <><ThumbUpAltOutlined fontSize='small'/>&nbsp;{likes.length} {likes.length === 1 ? 'Like':'Likes'}</>
                  )
            }
            return <><ThumbUpAltOutlined fontSize='small'/>&nbsp;Like</>
      }

      const openPost=()=> navigate(`/posts/${post._id}`)

 return (
      <Card style={classes.card} raised elevation={6}>
            <ButtonBase style={classes.cardAction} onClick={openPost}>

            <CardMedia style={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'}  title={post.title}></CardMedia>
            <div style={classes.overlay}>
                  <Typography variant='h6'>{post.name}</Typography>
                  <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
            <div style={classes.overlay2}>
                  <Button style={{color:'white'}} size="small" onClick={()=>{setCurrentId(post._id)}}>
                  <MoreHoriz fontSize="medium"/>
                  </Button>
            </div>)}
            <div style={classes.details}>
                  <Typography variant="body2" color="textSecondary">{post.tags.map((tag)=>`#${tag} `)}</Typography>
            </div>
            <Typography style={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
            <Typography variant="body2" color='textSecondary' component='p'>{post.message}</Typography>
            </CardContent>
            </ButtonBase>
            <CardActions style={classes.cardActions}>
                  <Button size="size" color="primary" disabled={!user?.result} onClick={handleLike}>
                        <Likes/>
                  </Button>
                  {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <Button size="size" color="primary" onClick={()=>dispatch(deletePost(post._id))}>
                        <Delete fontSize="small"/>
                              Delete
                        </Button>
                  )}
            </CardActions> 
      </Card>
 )
}
export default Post;