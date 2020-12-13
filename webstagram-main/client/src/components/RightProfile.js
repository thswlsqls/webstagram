import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { getFollowing } from '../_actions/user_action';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import FollowerFrame from './FollowerFrame';


const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: theme.spacing(5),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
    },
    root: {
        minWidth: 275,
        height: "100%"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));






export default function SimpleCard(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const [following, setfollowing] = React.useState([]);



    const handle = (event) => {
        const body = {
            userID : props.userID,
        }
    
        dispatch(getFollowing(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
          .then(response => {
            setfollowing(response.payload);
            console.log(following);
          })

        
    }


    return (
        <Card className={classes.root}>
            <CardContent>
                <IconButton onClick = {handle}>
                    <Avatar src={props.userImg} />
                </IconButton>
                <Typography className={classes.margin} variant="h5" component="h2">
                    {props.userName}
                </Typography>
                <Typography className={classes.margin} color="textSecondary" display="inline" margin="3">
                    게시물
                </Typography>
                <Typography className={classes.margin} color="textSecondary" display="inline">
                    팔로잉
                </Typography>
                {following? following.map((follow)=> <FollowerFrame follower = {follow.followingID} /> ): <div/>}
                <Typography className={classes.margin} color="textSecondary" display="inline">
                    팔로워
                </Typography>

            </CardContent>
        </Card>
    );
}