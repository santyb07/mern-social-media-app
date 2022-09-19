import React from 'react'
import Post from './Post/Post';
import {Grid,CircularProgress} from "@mui/material"
import { useSelector } from 'react-redux';

import useStyles from "./styles"

const Posts = ({setCurrentId}) => {
  const {posts, isLoading}=useSelector((state)=>state.posts); // [] -> {posts:[]}
  const classes= useStyles();

  // console.log(posts);

  if(!posts.length && !isLoading) return 'No Posts';
  return (
    isLoading ? <CircularProgress/>:(
      <Grid sx={classes.mainContainer} container alignItems='stretch' spacing={3}>
        {posts.map((post)=>(
          <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
            <Post post={post} setCurrentId={setCurrentId}></Post>
          </Grid>
        ))}
      </Grid>
    )
  )
}
export default Posts;