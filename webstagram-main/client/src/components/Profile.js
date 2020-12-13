import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { profileUser, img } from '../_actions/user_action';




const useStyles = makeStyles((theme) => ({
    margin: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props) {

    const classes = useStyles();
    const dispatch = useDispatch();


    const [open, setOpen] = React.useState(false);
    const [profileImg, setProfileImg] = React.useState(null);
    const [profileImgName, setProfileImgName] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [birthday, setBirthday] = React.useState('');
    const [job, setJob] = React.useState('');
    const [url, setUrl] = React.useState('');


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const onSubmitHandler = (event) => {
        event.preventDefault(); //페이지가 리프레시 되는 것을 막는다.

        const body = new FormData();
        body.append("userID", props.userID);
        body.append("location", location);
        body.append("birthday", birthday);
        body.append("job", job);
        body.append("url", url);

        dispatch(profileUser(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)

        setProfileImg(null);   // 이부분 수정하고 싶은데...
        setProfileImgName('');
        setLocation('');
        setBirthday('');
        setJob('');
        handleClose();

        window.location.reload();
    }


    const handleFileChange = (event) => {
        setProfileImg(event.target.files[0]);
        setProfileImgName(event.target.value);

        const body = new FormData();
        body.append("img", profileImg);

        dispatch(img(body))    // 위 바디를 담아서 보낸다고 생각하자  (리엑트/리덕트를 보내는 곳)
            .then(response => {
                setUrl(response.payload.url);
            })

    }


    const handleLocationChange = (event) => {
        setLocation(event.currentTarget.value);
    }

    const handleBirthdayChange = (event) => {
        setBirthday(event.currentTarget.value);
    }


    const handleJobChange = (event) => {
        setJob(event.currentTarget.value);
    }


    return (
        <div>

            <IconButton
                onClick={handleClickOpen}>
                <Avatar src={props.userImg} />
            </IconButton>


            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"사용자 정보 입력"}</DialogTitle>
                <DialogContent>

                    <Container maxWidth="sm" className={classes.margin} >
                        <DialogContentText id="alert-dialog-slide-description" className={classes.margin} >
                            프로필 사진을 입력해 주세요
                    </DialogContentText>
                        <Avatar src={url} />
                        <TextField variant="outlined" type="file" id="file" name="file" file={profileImg} value={profileImgName} onChange={handleFileChange} className={classes.margin} />
                        <TextField variant="outlined" type="text" id="location" name="location" label="사는 곳" value={location} onChange={handleLocationChange} className={classes.margin} />
                        <TextField variant="outlined" type="text" id="birthday" name="birthday" label="생일" value={birthday} onChange={handleBirthdayChange} className={classes.margin} />
                        <TextField variant="outlined" type="text" id="job" name="job" label="직업" value={job} onChange={handleJobChange} className={classes.margin} />
                        <Button type="submit" onClick={onSubmitHandler} variant="contained" color="primary" className={classes.margin} > 프로필 갱신 </Button>
                    </Container>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}