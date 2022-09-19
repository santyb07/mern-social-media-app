import React,{useState} from 'react'
import {Typography, TextField, Button} from "@mui/material"
import {useDispatch} from 'react-redux'
import { useRef } from 'react'

import useStyles from './styles'
import {commentPost} from "../../actions/posts"

const CommentSection = ({post}) => {
    const classes=useStyles();
    const [comments,setComments]= useState(post?.comments);
    const [comment,setComment] = useState('');
    const dispatch=useDispatch();
    const user= JSON.parse(localStorage.getItem('profile'));
    const commentsRef=useRef();

    console.log(comments)
    const handleClick= async ()=>{
        const finalComment= `${user.result.name}:${comment}`;
        const newComments= await dispatch(commentPost(finalComment,post._id));
        console.log(newComments);
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({behavior:'smooth'});
    }
  return (
    <div>
        <div style={classes.commentsOuterContainer}>
            <div style={classes.commentsInnerContainer}>
                <Typography gutterBottom variant='h6'> comments</Typography>
                {comments.map((c,i)=>(
                    <Typography key={i} gutterBottom variant='subtitle1'>
                       <strong> {c.split(":")[0]}:</strong>
                       {c.split(":")[1]}
                    </Typography>
                ))}
                <div ref={commentsRef}></div>
            </div>
            {user?.result?.name && (
            <div style={{width:'70%'}}>
            <Typography gutterBottom variant='h6'> Write a comment</Typography>
            <TextField
            fullWidth
            rows={4}
            variant='outlined'
            label='Comment'
            multiline
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            >
            </TextField>
            <Button style={{marginTop:'10px'}} fullWidth disabled={!comment} variant='contained' onClick={handleClick}>Comment</Button>
            </div>)}
        </div>
    </div>
  )
}
export default CommentSection;