import { Card, CardActionArea, CardContent, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
    minWidth: '200px'
  },
  media: {
    minHeight: '200px'
  }
}))

const Book = (props) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <Link to={`/product/${props.id}`}>
        <CardActionArea style={{ height: '100%' }}>
          <CardMedia
            className={classes.media}
            image={props.src}
          />
          <CardContent>
            <Typography gutterBottom variant="button" component="h2">
              {props.newprice}
            </Typography>
            <Typography variant="body2" color="textSecondary" style={{ textDecoration: 'line-through' }}>
              {props.oldprice}
            </Typography>
            <Typography variant="button" component="h2">
              {props.title}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  )

}

Book.defaultProps = {
  id: '',
  title: '',
  newprice: '',
  oldprice: '',
  src: ''
}

export default Book