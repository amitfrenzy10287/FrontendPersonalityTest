import axios from '../../axios-test';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = () => {
    return dispatch => {
        dispatch(authStart());
        let url = '/login/';
        axios.post(url)
            .then(response => {
                dispatch(authSuccess(response.data.token));
            })
            .catch(err => {
                dispatch(authFail(err));
            });
    };
};