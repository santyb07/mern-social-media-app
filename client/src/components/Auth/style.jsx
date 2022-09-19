import { createTheme } from "@mui/material";


const makeStyles=()=>({
    paper:{
        marginTop: '10px',
        display:'flex',
        flexDirection:'column',
        alignItem:'center',
        textAlign:"center",
        padding:"20px",
    },
    root:{
        '& .MuiTextField-root':{
            margin:'10px',
        },
    },
    avatar:{
        margin:'auto',
        backgroundColor:'orange'
    },
    form:{
        width:'100%',
        marginTop:'10px'
    },
    submit:{
        margin:'10px',
    },
    googleButton:{
        marginBottom:'10px'
    }
})
export default makeStyles;