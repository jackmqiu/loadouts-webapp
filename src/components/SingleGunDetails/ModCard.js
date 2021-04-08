import React from 'react';
import Color from 'color';
import GoogleFont from 'react-google-font-loader';
import { makeStyles } from '@material-ui/core/styles';
import NoSsr from '@material-ui/core/NoSsr';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardActionArea from '@material-ui/core/CardActionArea';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { useFourThreeCardMediaStyles } from '@mui-treasury/styles/cardMedia/fourThree';
import {
  ak47,
  nineteenEleven,
  mac10,
  mp5,
  mp7,
  krissVector,
  fnScar,
  m4,
  m16,
  ar15,
  glock,
  sig,
  beretta,
  desertEagle,
  aap01,
  grip,
  light,
  magazine,
  rail,
  scope,
  stock,
  trigger,
} from '../../Img';

const gunImageTable = {
  'AK-47': ak47,
  '1911': nineteenEleven,
  'MAC-10': mac10,
  MP5: mp5,
  MP7: mp7,
  'KRISS Vector': krissVector,
  'AK-47': ak47,
  'FN-SCAR': fnScar,
  M4: m4,
  M16: m16,
  'AR-15': ar15,
  Glock: glock,
  Sig: sig,
  Beretta: beretta,
  'Desert Eagle': desertEagle,
  'AAP-01': aap01,
  Grip: grip,
  Light: light,
  Magazine: magazine,
  Rail: rail,
  Optic: scope,
  Stock: stock,
  Trigger: trigger,
}

const ModCard = ({ classes, partName }) => {
  const mediaStyles = useFourThreeCardMediaStyles();
  return (
    <CardActionArea className={classes.actionArea}>
      <Card className={classes.card}>
        <CardMedia classes={mediaStyles} image={gunImageTable[partName]} />
        <CardContent className={classes.content}>
          <Typography className={classes.title} variant={'h2'}>
            {partName}
          </Typography>
          <Typography className={classes.subtitle}>{}</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default ModCard;
