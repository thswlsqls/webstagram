import React, { useState, useEffect } from 'react';
import Post from './Post';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { post, img } from '../_actions/user_action';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import CardMedia from '@material-ui/core/CardMedia';
import GridList from '@material-ui/core/GridList';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  gridList: {
    height: 800,
  },
  grid: {
    width: '100%',
  },
  fabButton: {
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


export const Loading = styled.div`
  width: 200px;
  margin: 20px auto;
  text-align: center;
`;



function ScrollList(props) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [postNum, setPostNum] = useState(5);
  const [open, setOpen] = useState(false);
  const [postImg, setpostImg] = useState(null);
  const [postImgName, setpostImgName] = useState("");
  const [url, setUrl] = useState("");
  //------------------------------다이얼로그------------------------------------- 


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setContent("");
    setpostImgName("")
    setUrl("");

  };



  //------------------------------무한 스크롤------------------------------------- 

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      callApiPost().then(res => setPosts(res));
      setLoading(false);
    };

    loadUsers();
  }, 1);


  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop === clientHeight) {
      callApiPost().then(res => setPosts(res));
      setPostNum(prev => prev + 3);
    }

  };

  const callApiPost = async () => {
    const response = await fetch('/api/posts/get');
    const post = await response.json();
    return post.filter((c, index) => index < postNum);
  }


  //---------------------------- summit 부분 --------------------------------------


  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

    const body = new FormData();
    body.append("userID", props.userID);
    body.append("content", content);
    body.append("postImg", url);


    dispatch(post(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
      .then(response => {
        if (response.payload.loginSuccess) {
          props.history.push('/') //리액트에서 페이지를 이동 방법
        } else {

          callApiPost().then(res => setPosts(res));
          setContent("");
          setpostImgName("")
          setUrl("");
        }
      })

    setOpen(false);
  }

  const onContentHandler = (event) => {
    setContent(event.currentTarget.value)
  }

  const handleFileChange =  (event) => {
    setpostImg(event.target.files[0]);
    setpostImgName(event.target.value);

    const body = new FormData();
    body.append("img", postImg);

    dispatch(img(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
      .then(response => {
        setUrl(response.payload.url);
      })


  }

  //------------------------------------------------------------------------

  return (

    <div >
      <Dialog />
      <Container alignItems='baseline' className={classes.grid}>
        <GridList cellHeight={60} className={classes.gridList} cols={3} onScroll={handleScroll}>
          {posts ? posts.map((pos) => <Post key={pos._id} post={pos} user={props.userID} className={classes.margin} />) : loading && <Loading>Loading ...</Loading>}
        </GridList>
        <Toolbar>
          <Fab color="secondary" aria-label="add" onClick={handleClickOpen} className={classes.fabButton}>
            <AddIcon />
          </Fab>
        </Toolbar>
      </Container>

      {loading && <Loading>Loading ...</Loading>}



      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <form noValidate>

          <DialogContent>
            <Typography component="div" variant="h5" className={classes.margin}>
              <Box textAlign="center" m={1}>
                글자를 입력해주세요
              </Box>
            </Typography>
            {url ? <CardMedia className={classes.media} image={url}/> : <div/>}
            <Grid container spacing={2}>
              <Grid item xs={15}>
                <TextField variant="outlined" type="file" id="file" name="file" file={postImg} value={postImgName} onChange={handleFileChange} className={classes.margin} />
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  type="text"
                  id="content"
                  label="content"
                  name="content"
                  autoComplete="content"
                  value={content}
                  onChange={onContentHandler}
                  className={classes.margin} />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <Button type="submit" onClick={onSubmitHandler} color="primary">
              입력
            </Button>
            <Button onClick={handleClose} color="primary">
              취소
            </Button>
          </DialogActions>
        </form>
      </Dialog>


    </div>

  );
}

export default ScrollList;