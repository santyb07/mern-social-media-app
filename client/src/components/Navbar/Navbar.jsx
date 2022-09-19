import React,{useState, useEffect} from 'react'
import {Link, useNavigate, useLocation} from "react-router-dom"
import {AppBar,Typography, Toolbar,Button, Avatar} from "@mui/material"
import memoriesLogo from "../../images/memoriesLogo.png"
import memoriesText from "../../images/memoriesText.png"
import useStyles from "./styles"
import { useDispatch } from 'react-redux'
import jwt_decode from "jwt-decode"



 const Navbar = () => {
    const classes =useStyles()
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')));
    // console.log(user);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const location=useLocation();


    const logout=()=>{
        dispatch({type:'LOGOUT'});
        navigate('/');
        setUser(null);
    }
    useEffect(()=>{
        const token=user?.token;
        if(token){
            const decodedToken= jwt_decode(token);
            if(decodedToken.exp *1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
  return (
    <AppBar style={classes.appBar} position='static' color='inherit'>
        <Link to='/'>
        <div style={classes.brandContainer}>
        <img  src={memoriesText} alt='icon' height='45px'/>
        <img style={classes.image} src={memoriesLogo} alt="memories" height='40px'></img>
        </div>
        </Link>
        <Toolbar style={classes.toolbar}>
            {user? (
                <div style={classes.profile}>
                    <Avatar style={classes.purple} alt={user.result.name} src={user.result.imageUrl}></Avatar>
                    <Typography style={classes.userName} variant='h6'>{user.result.name}</Typography>
                    <Button variant='contained' style={classes.logout} color='secondary' onClick={logout}>Logout</Button>
                </div>
            ):(
                <Button component={Link} to='/auth' variant="contained" color="primary">Sign In</Button>
            )}
        </Toolbar>
      </AppBar>
  )
}
export default Navbar;