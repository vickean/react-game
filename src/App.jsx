import React, { useReducer, useEffect } from 'react';
import './App.css';
import { 
  Grid,
  Paper,
  Typography,
  Button,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import 'typeface-roboto';

const useStyles = makeStyles({
  root: {
    width: '100%',
    maxWidth: 500,
    height: '100%',
    maxHeight: 500,
  },
  maxHpBar: {
    height: '12px',
    backgroundColor: 'gray',
    position: "relative",
    width: '100%',
    borderRadius: '12px'
  },
  currentHpBar: {
    height: '12px',
    backgroundColor: 'red',
    position: 'absolute',
    width: '50%',
    borderRadius: '12px'
  },
  charDetailsPaper: {
    padding: '10px',
    margin: '10px',
    minWidth: '250px',
  },
  actionButton: {
    minWidth: '95%',
  },
  charDetailsText: {
    textTransform: 'uppercase',
    fontWeight: 500,
  },
});

const initialState = {
  player: {
    name: 'Player',
    maxHp: 100,
    currentHp: 100,
    attack: 10,
  },
  enemy: {
    name: 'Enemy',
    maxHp: 100,
    currentHp: 60,
    attack: 10,
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'initialize':
      return initialState;
    default:
      throw new Error('Unknown Action!');
  }
}

const CharacterDetails = props => {
  const { character } = props;
  const currentHpWidth = (character.currentHp / character.maxHp) * 100;

  const classes = useStyles();

  return (
    <Paper className={classes.charDetailsPaper}>
      <Grid container>
        <Grid item xs={6}>
          <Typography className={classes.charDetailsText}>
            {character.name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography align='right' className={classes.charDetailsText}>
            HP: {character.currentHp} / {character.maxHp}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Box name="maxHp" className={classes.maxHpBar} boxShadow={1}>
              <Box name="currentHp" style={{ width: `${currentHpWidth}%` }} className={classes.currentHpBar} boxShadow={1}/>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}

const CharacterAction = props => {
  const classes = useStyles();

  return (
    <Paper className={classes.charDetailsPaper}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.charDetailsText}>
            Moves
          </Typography>
        </Grid>
        <Grid item xs={6} style={{textAlign: 'center'}}>
          <Button
            variant='contained'
            color='secondary'
            className={classes.actionButton}
          >
            ATTACK
          </Button>
        </Grid>
        <Grid item xs={6} style={{textAlign: 'center'}}>
          <Button
            variant='contained'
            color='primary'
            className={classes.actionButton}
          >
            GUARD
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

const App = () => {
  const [ state, dispatch ] = useReducer(reducer, initialState);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh', backgroundColor: '#dedede' }}
    >
      <Grid item xs={12}>
        <Paper style={{height: 540, width: 300, backgroundColor: '#efefef'}}>
          <Grid 
            container 
            direction='column' 
            justify='space-between' 
            alignItems='center'
            style={{ minHeight: '100%' }}
          >
            <Grid item xs={12}>
              <CharacterDetails character={state.enemy} />
            </Grid>
            <Grid item xs={12}>
              <Paper style={{height: 250, width: 250}}/>
            </Grid>
            <Grid item xs={12}>
              <CharacterAction />
            </Grid>
            <Grid item xs={12}>
              <CharacterDetails character={state.player} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default App;
