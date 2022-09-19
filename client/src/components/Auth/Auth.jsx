import React,{useState, useEffect} from 'react'
import {Avatar, Button, Paper, Grid, Typography, Container} from "@mui/material"
import {GoogleLogin} from "react-google-login"
import { gapi } from "gapi-script";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {signup,signin} from "../../actions/auth"


import Icon from './icon';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import useStyles from "./style"
import Input from './Input'

const initialState= {
  firstName:'',
  lastName:'',
  email:'',
  password:'',
  confirmPassword:''
}
const Auth = () => {
  const [isSignup,setIsSignup]= useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const classes=useStyles();
  const [formData,setFormData]=useState(initialState);
  const dispatch=useDispatch();
  const navigate=useNavigate();


  const handleShowPassword=()=>setShowPassword((prevShowPassword)=> !prevShowPassword)

  const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData,navigate))
    }else{
      dispatch(signin(formData,navigate))
    }
  }
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})
  }
  const switchMode=()=>{
    setIsSignup((prevIsSignup)=>!prevIsSignup)
    setShowPassword(false)
  }
  const googleSuccess=async(res)=>{
    const result= res?.profileObj;
    const token=res?.tokenId;
    try{
      dispatch({type:'AUTH' , data:{result, token}})
      navigate('/');

    }catch(error){
      console.log(error);
    }
  }
  const googleFailure=(error)=>{
        console.log('google Sign In was unsuccessfull.',error)
  }
  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
  //       scope: 'email',
  //     });
  //   }

  //   gapi.load('client:auth2', start);
  // }, []);
  return (
    <Container component='main' maxWidth='xs'>
      <Paper style={classes.paper} elevation={3}>
        <Avatar style={classes.avatar}>
          <LockOutlinedIcon></LockOutlinedIcon>
        </Avatar>
        <Typography variant='h5'>{isSignup? 'Sign Up': 'Sign In'}</Typography>
        <form style={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half></Input>
                <Input name='lastName' label="Last Name" handleChange={handleChange} half></Input>
                </>
              )
            }
            <Input name='email' label='Email Address' handleChange={handleChange} type="email"></Input>
            <Input name='password' label="password" handleChange={handleChange} type={showPassword? "text":"password"} handleShowPassword={handleShowPassword}></Input>
            {isSignup && <Input name='confirmPassword' label="Repeat password" handleChange={handleChange} type='password'></Input>}
          </Grid>
          
          <Button type='submit' fullWidth variant='contained' color='primary' style={classes.submit}>
            {isSignup? 'Sign Up': 'Sign in'}
          </Button>
          <GoogleLogin
          clientId="46460897632-banfobe79qmmelblff85c0eadj6jtmun.apps.googleusercontent.com"
          render={(renderProps)=>(
            <Button style={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon/>} variant='contained'>
              Google Sign In
              </Button>
          )}
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={'single_host_origin'}
          ></GoogleLogin>
          <Grid container justify='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup? 'Already have an account? Sign In':"Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}
export default Auth;