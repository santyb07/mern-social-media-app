import React,{useState,useEffect} from 'react'
import {Container,AppBar, TextField, Button, Typography, Grow, Grid, Paper, Chip, ListItem} from "@mui/material"
import Posts from '../Posts/Posts'
import { useDispatch, useSelector } from 'react-redux'
import {getPosts, getPostBySearch} from "../../actions/posts"
import Pagination from '../Pagination/Pagination'
import { useNavigate, useLocation, Navigate, useParams, useSearchParams } from 'react-router-dom'

import useStyles from "./styles"
import Form from '../Form/Form'

const useQuery= ()=>{
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes =useStyles()
    const [currentId, setCurrentId]= useState(null);
    const dispatch= useDispatch();
    const query= useQuery();
    const page= query.get('page') || 1;
    const searchQuery= query.get('searchQuery');
    const [search,setSearch]=useState('');
    const [searchTag,setSearchTag]=useState('');
    const [tags,setTags]=useState([]);

    const navigate=useNavigate();

    const searchPost=()=>{
      if(search.trim() || tags){
        dispatch(getPostBySearch({search,tags:tags.join(',')}))
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`)
      }else{
        console.log('something went wrong')
        navigate('/');
      }
    }

    const handleKeyPress=(e)=>{
      if(e.keyCode === 13){
        if(e.target.name==='tags'){
          setTags([...tags,searchTag]);
          setSearchTag('')
        }else{
          searchPost();
        }
      }
    }
    const onDeleteTag=(deleteTag)=>{
      console.log(deleteTag)
      const filterTags=tags.filter((tag,index)=>{
        return tag[deleteTag]!==tag[index];
      })
      setTags(filterTags)
    }
   
  return (
    <Grow in>
        <Container maxWidth='xl'>
          <Grid sx={classes.gridContainer} container justify="space-between" alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId}/>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar style={classes.appBarSearch} position='static' color='inherit'>
              <TextField 
              style={{marginBottom:'10px'}}
              name='search'
              variant='outlined'
              label='Seach Memories'
              fullWidth
              onKeyDown={handleKeyPress}
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              />
               <TextField 
               name='tags'
              variant='outlined'
              label='Seach Tags'
              fullWidth
              onKeyDown={handleKeyPress}
              value={searchTag}
              onChange={(e)=>{setSearchTag(e.target.value)}}
              />
              <ListItem>
                {
                  tags.map((tag,index)=>(
                    <Chip
                    key={index}
                    label={tag}
                    onDelete={()=>onDeleteTag(index)}
                    />
                  ))
                }
             
              </ListItem>
              <Button onClick={searchPost} style={classes.searchButton} variant='contained'>
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId}/>
            {(!searchQuery && !tags.length) && (
               <Paper elevation={6} sx={classes.pagination}>
               <Pagination page={page}/>
             </Paper>
            )}
          </Grid>
          </Grid>
        </Container>
    </Grow>
  )
}
export default Home;