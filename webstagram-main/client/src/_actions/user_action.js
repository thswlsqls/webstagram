import Axios from 'axios'

import {
    LOGIN_USER,
    SIGNUP_USER,
    AUTH_USER,
    POST,
    PROFILE_USER,
    IMG,
    COMMENT,
    GETCOMMENT,
    LIKE,
    GETLIKE,
    PROFILE,
    FOLLOWING,
    GETFOLLOWING,
} from './types';


const config = {
    headers: {
        'content-type': 'multipart/form-data'
    }
}



export function loginUser(dataToSubmit) {

    const request = Axios.post('/api/auth/login', dataToSubmit) //입력받은 데이터를 인자로 갖고 서버로 요청을 보낸다.
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: LOGIN_USER, //전달하는 데이터를 구분하기 위한 것이다.
        payload: request //전달하는 데이터이다.
    }
}

export function SignUpUser(dataToSubmit) {

    const request = Axios.post('/api/auth/signup', dataToSubmit)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과, 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: SIGNUP_USER, //전달하는 데이터를 구분하기 위한 것이다.
        payload: request //전달하는 데이터이다.
    }
}

export function auth() {

    const request = Axios.get('/api/auth/auth')
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: AUTH_USER,
        payload: request
    }
}


export function post(dataToSubmit) {

    const request = Axios.post('/api/posts/create', dataToSubmit, config)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: POST,
        payload: request
    }
}


export function profileUser(dataToSubmit) {

    const request = Axios.post('/api/users/profileUpdate', dataToSubmit, config)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: PROFILE_USER,
        payload: request
    }
}

export function img(dataToSubmit) {

    const request = Axios.post('/api/posts/img', dataToSubmit, config)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: IMG,
        payload: request
    }
}

export function comment(dataToSubmit) {

    const request = Axios.post('/api/comments/create', dataToSubmit)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: COMMENT,
        payload: request
    }
}

export function getComment(dataToSubmit) {

    const request = Axios.post('/api/comments/get', dataToSubmit)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: GETCOMMENT,
        payload: request
    }
}

export function like(dataToSubmit) {
    
    const request = Axios.post('/api/posts/like', dataToSubmit)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: LIKE,
        payload: request

    }
}

export function getLike(dataToSubmit) {
    
    const request = Axios.post('/api/posts/getLike', dataToSubmit)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: GETLIKE,
        payload: request

    }
}

export function profile(dataToSubmit) {

    const request = Axios.post('/api/users/profile', dataToSubmit)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: PROFILE,
        payload: request
    }
}

export function following(dataToSubmit) {

    const request = Axios.post('/api/users/following', dataToSubmit)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: FOLLOWING,
        payload: request
    }
}


export function getFollowing(dataToSubmit) {

    const request = Axios.post('/api/users/getFollowing', dataToSubmit)
        .then(response => response.data) //요청을 보내서 서버에서 받은 응답을 저장한다.

    return { // 그리고 리듀서로 보낸다. 액션은 타입과 서버로부터 받은 reponse로 구성되므로 아래와 같이 반환한다.
        type: GETFOLLOWING,
        payload: request
    }
}




