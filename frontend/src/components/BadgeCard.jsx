import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const BadgeCard = (props) => {
  return (
    <Card key={props.id} sx={{ width: 275, m: 2 }}>
      <CardMedia component="img" image={props.image} sx={{ height: 200 }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.desc}
        </Typography>
      </CardContent>
      <CardActions>
        {props.links.map((elt) => (
          <Button size="small" component={Link} to={elt.route} key={elt.title}>
            {elt.title}
          </Button>
        ))}
      </CardActions>
    </Card>
  );
}

export default BadgeCard