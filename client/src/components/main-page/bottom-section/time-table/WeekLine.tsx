import React from 'react';
import {
  List, ListItem, Button, Typography,
} from '@material-ui/core';
import {
  makeStyles, createStyles, Theme, fade,
} from '@material-ui/core/styles';

import moment from 'moment';
import classname from 'classnames';
import { SchoolClass } from '../shared/interfaces/timeTable.inteface';

interface WeekTimeLineProps {
  schoolClasses: SchoolClass[];
  targetWeek: string;
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    marginBottom: '16px',
  },
  titleCurrWeek: {
    fontWeight: 'bold',
  },
  weekLineWrapper: {
    width: '14%',
    height: '780px',
  },
  '@keyframes blinker': {
    from: { opacity: 1 },
    to: { opacity: 0.5 },
  },
  blinkIcon: {
    animationName: '$blinker',
    animationDuration: '900ms',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    animationTimingFunction: 'ease-in-out',
  },
  list: {
    border: `1px solid ${theme.palette.secondary.dark}`,
    height: 780,
    padding: 0,
    borderRadius: 4,
    overflowY: 'hidden',
  },
  listCurrWeek: {
    border: `3px solid ${theme.palette.secondary.contrastText}`,
    borderRadius: 4,
  },
  classItem: {
    color: 'white',
    position: 'absolute',
    borderRadius: 4,
    boxShadow: theme.shadows[2],
  },
  backgroundItem: {
    position: 'absolute',
    height: '60px',
    borderBottom: '1px solid gray',
  },
}));

function splitTimeString(str: string) {
  const result = str.split(',');
  if (result.length > 1) {
    return result;
  }
  result.push('일');
  return result;
}

export default function WeekLine(props: WeekTimeLineProps): JSX.Element {
  const classes = useStyles();
  const { schoolClasses, targetWeek } = props;
  const schoolTimes = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

  const days = ['월', '화', '수', '목', '금', '토'];
  const isCurrWeek = days[moment().day() - 1] === targetWeek;

  return (
    <div className={classes.weekLineWrapper}>
      <Typography
        variant="h6"
        align="center"
        color="textSecondary"
        style={{
          fontWeight: 'bold',
        }}
        className={classname({
          [classes.title]: true,
          [classes.titleCurrWeek]: isCurrWeek,
        })}
      >
        {targetWeek}
      </Typography>

      <List className={classname({
        [classes.list]: true,
        [classes.listCurrWeek]: isCurrWeek,
        [classes.blinkIcon]: isCurrWeek,
      })}
      >
        {schoolTimes.map((each) => (
          <ListItem
            className={classes.backgroundItem}
            style={{ marginTop: (each - 9) * 60 }}
          />
        ))}

        {schoolClasses.map((eachClass) => {
          const pos = {
            height: 0,
            marginTop: 0,
          };

          const times = splitTimeString(eachClass['시간표']);

          const firstClass = times[0].split(' ');
          const secondClass = times[1].split(' ');

          if (firstClass[0] === targetWeek) {
            const time = moment(`2020/10/10 ${firstClass[1].slice(0, 5)}:00`);
            pos.height = firstClass[1][9] === ')' ? Number(firstClass[1].slice(6, 9)) : Number(firstClass[1].slice(6, 8));
            pos.marginTop = (time.diff(moment('2020/10/10 09:00:00'), 'minutes'));
          } else if (secondClass && secondClass[0] === targetWeek) {
            const time = moment(`2020/10/10 ${secondClass[1].slice(0, 5)}:00`);
            pos.height = secondClass[1][9] === ')' ? Number(secondClass[1].slice(6, 9)) : Number(secondClass[1].slice(6, 8));
            pos.marginTop = (time.diff(moment('2020/10/10 09:00:00'), 'minutes'));
          }

          return (
            <ListItem
              className={classes.classItem}
              style={{
                marginTop: pos.marginTop,
                height: pos.height,
                backgroundColor: eachClass.color ? eachClass.color : '#ffff',
              }}
            >
              <Typography variant="body1" align="left">
                {eachClass['교과목명'].length > 10 ? `${eachClass['교과목명'].slice(0, 11)}..` : eachClass['교과목명']}
              </Typography>
            </ListItem>
          );
        })}
      </List>
    </div>

  );
}
