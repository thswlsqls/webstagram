import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { withRouter } from 'react-router-dom';
import AppBar from '../components/Appbar';
import ScrollList from '../components/ScrollList';
import RightProfile from '../components/RightProfile';
import Grid from '@material-ui/core/Grid';




function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    padding: theme.spacing(6),
  },
}));


export function onClickHandler(props) {


  Axios.get('/api/users/logout')
    .then(response => {
      if (response.data.success) {
        props.history.push("/login")
      } else {
        alert('로그아웃 하는데 실패 했습니다.')
      }
    })
}

function Main(props) {

  const classes = useStyles();

  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [userImg, setUserImg] = useState("");


  // 시작과 동시에 쿠키에서 유저 이메일을 가져온다.
  useEffect(async () => {
    const response = await fetch('/api/auth/auth');
    const auth = await response.json();
    setUserID(auth._id);
    setUserName(auth.name);
    setUserImg(auth.profileImg);
  }, []);


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative" userID={userID} userImg={userImg} >
      </AppBar>
      <Grid container spacing={3}>
        <Grid item xs={2}>
        </Grid>
        <Grid item xs={8}>
          <ScrollList userID={userID} userImg={userImg} />
        </Grid>
        <Grid item xs={2}>
          <RightProfile userName={userName} userImg={userImg} userID={userID} />
        </Grid>
      </Grid>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}

export default withRouter(Main);
