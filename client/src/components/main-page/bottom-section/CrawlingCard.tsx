import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    section: {
      height: '100%',
      width: '100%',
      textAlign: 'center',
      margin: 15,
    },
  }),
);

//input의 type
interface Props {
  id: number;
  title: string;
  href: string;
  content: string;
}

const CrawlingCard = ({ id, title, href, content }: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.section}>
      <CardActionArea href={href}>
        <CardMedia //사진 - 어떻게 설정하지?
          component="img"
          alt="Contemplative Reptile"
          height="240"
          image="/images/space.jpg"
          title="Space"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {content}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CrawlingCard;
