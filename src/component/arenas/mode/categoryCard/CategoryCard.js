import React from 'react'
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 200,
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });

const CategoryCard = ({mode,category}) => {
    const classes = useStyles();
    const history=useHistory();
    const handleClick=()=>{
        history.push(`/contest/${mode}/${category.name}`);
    }

    return (
        <Card className={classes.root} >
        <CardActionArea onClick={handleClick} >
          <CardMedia
            className={classes.media}
            image="https://images.indianexpress.com/2020/09/PUBG-mobile-1.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {category.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
            {category.info}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
       
    )
}

export default CategoryCard
