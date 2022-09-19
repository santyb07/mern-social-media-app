

const makeStyles=()=>({
    media: {
        borderRadius: '20px',
        objectFit: 'cover',
        width: '100%',
        maxHeight: '600px',
    
      },
      card: {
        display: 'flex',
        width: '100%',
        flexDirection:{
          xl:'row',
          lg:'row',
          md:'column',
          sm:'column'
        },
        flexWrap:{
          // xl:'nowrap',
          // lg:'nowrap',
          // md:'wrap',
          // sm:'wrap',
        },
        
      },
      section: {
        borderRadius: '20px',
        margin: '10px',
        flex: 1,
      },
      imageSection: {
        // marginLeft: '20px',
        marginLeft:{
            sm:0,
        }
      },
      recommendedPosts: {
        display: 'flex',
        flexDirection:{
            sm:'column'
        }
      },
      loadingPaper: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
      },
      commentsOuterContainer:{
        display:'flex',
        justifyContent:'space-between',

      },
      commentsInnerContainer:{
        height:'200px',
        overflowY:'auto',
        marginRight:'30px'
      }
})
export default makeStyles;