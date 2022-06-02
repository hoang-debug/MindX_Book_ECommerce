import { Box, Button, Grid, Link, makeStyles, Paper, Typography } from "@material-ui/core";
import { ArrowRight } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '300px',
    backgroundColor: '#f5f5f5',
    // paddingBottom: theme.spacing(2)
    display: 'flex',
    justifyContent: 'center',
    maxWidth: '1480px',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    objectPosition: 'center',
    backgroundColor: '#f5f5f5',
    cursor: 'pointer',
  },

}))

const Banner = (props) => {
  const classes = useStyles()
  return (
    <div 
      className={classes.root}
    >
      <img
        className={classes.image}
        src={props.img_url}
        onClick={()=>{window.open(props.link, '_blank')}}
        alt="banner"
      />
    </div>

  )

}

Banner.defaultProps = {
  img_url: '',
  link: '',
  show_start: '',
  show_end: '',
  _id: ''
}

export default Banner