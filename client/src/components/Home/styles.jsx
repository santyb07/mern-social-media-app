
const makeStyles=() => ({
    appBar: {
      borderRadius: 15,
      margin: '30px 0',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    heading: {
      color: 'rgba(0,183,255, 1)',
    },
    image: {
      marginLeft: '15px',
    },
    mainContainer:{
      display:"flex",
      flexDirection:{
        xl:"row",
        lg:"row",
        md:"column-reverse",
        sm:"column-reverse",
        xs:"column-reverse"
      }
    },
    appBarSearch: {
      borderRadius: 4,
      marginBottom: '1rem',
      display: 'flex',
      padding: '16px',
    },
    pagination: {
      borderRadius: 4,
      marginTop: '1rem',
      padding: '16px',
    },
    searchButton:{
      // backgroundColor:'blue',
      // color:'white',
      borderRadius:'15px',
      // width:'50%',
      // textAlign:'center',
      // margin:'auto'
    }
  });
  export default makeStyles;