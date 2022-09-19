import {deepPurple} from "@mui/material/colors"

const makeStyles=()=>({
    appBar:{
        borderRadius:15,
        margin:'30px 0',
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:'10px 50px'
    },
    heading:{
        color:'rgba(0,183,255,1)',
        textDecoration:'none',
        fontSize:'2em',
        fontWeight:'300'
    },
    image:{
        margineLeft:'15px',
        marginTop:'5px'
    },
    toolbar:{
        display:'flex',
        justifyContent:'flex-end',
        width:'400px'
    },
    profile:{
        display:'flex',
        justifyContent:'space-between',
        width:{
            xl:'400px',
            lg:'400px',
            md:'400px',
            sm:'auto',
        },
        alignItems:'center'
    },
    logout:{
        margineLeft:'20px'
    },
    userName:{
        display:'flex',
        alignItems:'center',
        marginLeft:'10px',
        marginRight:'10px'
    },
    brandContainer:{
        display:'flex',
        alignItems:'center',
    },
    purple:{
        color:deepPurple,
        backgroundColor:deepPurple[500],
    }
})
export default makeStyles;