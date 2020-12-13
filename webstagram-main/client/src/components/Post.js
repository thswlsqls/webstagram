import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { comment, getComment, like, profile , following , getFollowing } from '../_actions/user_action';
import Comment from './Comment';
import styled from 'styled-components';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import UnFavoriteIcon from '@material-ui/icons/FavoriteBorder';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



const useStyles = makeStyles((theme) => ({
  marginLeft: {
    marginLeft: theme.spacing(7),
    marginRight: theme.spacing(7)
  },
  margin: {
    marginLeft: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export const Loading = styled.div`
  width: 200px;
  margin: 20px auto;
  text-align: center;
`;




const Post = ({ post, user }) =>


  <Container paddingTop='spacing(8)' paddingBottom='spacing(8)' maxWidth="md">
    <CardContent display='flex' flexDirection='column'>
      <PostCard content={post.content} postImg={post.postImg} profileImg={post.userID.profileImg} name={post.userID.name} postID={post._id} postOwner={post.userID._id} userID={user} />
    </CardContent>
  </Container>

export default Post;

function PostCard(props) {

  const dispatch = useDispatch();
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
  const [comments, setComments] = React.useState("");
  const [commentList, setcommentList] = React.useState([]);

  const [likes, SetLikes] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);

    const body = {
      postID: props.postID,
    }

    dispatch(getComment(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
      .then(response => {
        setcommentList(response.payload);
      })
  };




  const onCommentsHandler = (event) => {
    setComments(event.currentTarget.value)
  };



  const onSubmitHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.


    const body = {
      comment: comments,
      userID: props.userID,
      postID: props.postID,
    }

    dispatch(comment(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
      .then(response => {
        if (response.payload.loginSuccess) {
          props.history.push('/') //리액트에서 페이지를 이동 방법
        } else {
        }
      })

    setComments("");
  
    dispatch(getComment({postID: props.postID}))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
      .then(response => {
        setcommentList(response.payload);
      })

  }



  const onLikeHandler = (event) => {
    event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

    const body = {
      userID: props.userID,
      postID: props.postID,
    }

    dispatch(like(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
    .then(response => {
       const likeUserList = response.payload[0].userID;
       if(likeUserList.includes(props.userID)){SetLikes(true)}
       console.log(likes)
    })

  }

  return (
    <Card className={classes.root}>

      <CardHeader
        avatar={
          <AlertProfile profileImg={props.profileImg} postOwner={props.postOwner} userID = {props.userID} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.name}
        subheader="September 14, 2016"
      />
      { props.postImg ? <CardMedia className={classes.media} image={props.postImg} title="Paella dish" /> : <div />}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        { likes ? <IconButton onClick={onLikeHandler} > <FavoriteIcon /> </IconButton> : <IconButton onClick={onLikeHandler} > <UnFavoriteIcon /> </IconButton>}
        <IconButton aria-label="share" onClick={onSubmitHandler}>
          <ArrowUpwardIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <TextField variant="outlined" value={comments} onChange={onCommentsHandler} fullWidth />
        <CardContent>
          <Paper>
            <Table className={classes.table}>
              {commentList ? commentList.map((comme) => <Comment comment={comme} />) : <div />}
            </Table>
          </Paper>
        </CardContent>
      </Collapse>
    </Card>
  );
}




export function AlertProfile(props) {
  const [open, setOpen] = React.useState(false);
  const [profileName, setProfileName] = React.useState("");
  const [profileLocation, setProfileLocation] = React.useState("");
  const [profileBirthday, setProfileBirthday] = React.useState("");
  const [profileJob, setProfileJob] = React.useState("");
  const [profileImg, setProfileImg] = React.useState("");
  const [followings, setfollowings] = React.useState([]);
  const [isFollowed, setIsFollowed] = React.useState(false);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);

    const body = {
      userID: props.postOwner
    }

    dispatch(profile(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
      .then(response => {
        setProfileName(response.payload[0].name);
        setProfileLocation(response.payload[0].location);
        setProfileBirthday(response.payload[0].birthday);
        setProfileJob(response.payload[0].job);
        setProfileImg(response.payload[0].profileImg);
      })

   dispatch(getFollowing({userID : props.userID}))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
          .then(response => {
            setfollowings(response.payload);

          followings.map(((id) => (id.followingID._id == props.postOwner) ?  setIsFollowed(true) : setIsFollowed(false)  ))
          console.log(isFollowed);
          })
    
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  const handleFollowing = () => {

    const body = {
      followerID : props.userID ,  // 자기 자신
      followingID : props.postOwner ,  // 팔로잉 할 사람 
    }

      dispatch(following(body))
      
      setOpen(false);
    };



  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <Avatar  src={props.profileImg}/>
      </IconButton>

    
    
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title"> {"이름 : " + profileName} </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Avatar aria-label="recipe" src={profileImg} />
            <div className={classes.margin} >
              <Typography className={classes.margin}>
                팔로워
              </Typography>
              <Typography className={classes.marginLeft}>
                팔로잉
              </Typography>
            </div>
            {profileLocation ? <Typography className={classes.margin}> {"사는 곳 : " + profileLocation} </Typography> : <Typography className={classes.margin}> 사는 곳 : 내용을 입력해주세요! </Typography>}
            {profileBirthday ? <Typography className={classes.margin}> {"생일 : " + profileBirthday} </Typography> : <Typography className={classes.margin}> 생일 : 내용을 입력해주세요! </Typography>}
            {profileJob ? <Typography className={classes.margin}> {"직업 : " + profileJob} </Typography> : <Typography className={classes.margin}> 직업 : 내용을 입력해주세요! </Typography>}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          { !isFollowed ? <Button onClick={handleFollowing} color="primary"> Follow </Button> : <Typography> 팔로잉한 상태입니다! </Typography> }
          <Button onClick={handleClose} color="primary">
            close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}