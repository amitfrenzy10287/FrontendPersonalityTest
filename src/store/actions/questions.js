import axios from '../../axios-test';

import * as actionTypes from './actionTypes';

export const fetchQuestionsSuccess = ( questions ) => {
    return {
        type: actionTypes.FETCH_QUESTIONS_SUCCESS,
        questions: questions
    };
};

export const fetchQuestionsFail = ( error ) => {
    return {
        type: actionTypes.FETCH_QUESTIONS_FAIL,
        error: error
    };
};

export const fetchQuestionsStart = () => {
    return {
        type: actionTypes.FETCH_QUESTIONS_START
    };
};

export const fetchQuestions = (token) => {
    return dispatch => {
        dispatch(fetchQuestionsStart());
        const url = '/get_questions'
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
        axios.post( url, {}, {headers: headers})
            .then( res => { 
                dispatch(fetchQuestionsSuccess(res.data));
            } )
            .catch( err => {
                dispatch(fetchQuestionsFail(err));
            } );
    };
};

export const submitTestStart = () => {
    return {
        type: actionTypes.SUBMIT_TEST_START
    };
};

export const initTest = (username) => {
    return {
        type: actionTypes.INIT_TEST,
        username: username
    };
};

export const submitTestSuccess = () => {
    return {
        type: actionTypes.SUBMIT_TEST_SUCCESS,
    };
};

export const submitTestFail = ( error ) => {
    return {
        type: actionTypes.SUBMIT_TEST_FAIL,
        error: error
    };
};

export const fetchResultFail = ( error ) => {
    return {
        type: actionTypes.FETCH_RESULT_FAIL,
        error: error
    };
};

export const fetchResultStart = () => {
    return {
        type: actionTypes.FETCH_RESULT_START
    };
};

export const fetchResultSuccess = (results) => {
    return {
        type: actionTypes.FETCH_RESULT_SUCCESS,
        results: results
    };
};

export const submitTest = ( username, personalityTestFormData, token ) => {
    return dispatch => {
        dispatch(submitTestStart());
        const url = '/submit_test';
        var headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
        axios.post( url, {data : { data: personalityTestFormData, username : username } }, { headers: headers })
            .then( res => { 
                dispatch(submitTestSuccess());
            } )
            .catch( err => {
                dispatch(submitTestFail(err));
            } );
    };
};

export const getTestResultsByUsername = ( username ) => {
    return dispatch => {
        dispatch(fetchResultStart());
        const url = '/get_test_results';
        var headers = {
            'Content-Type': 'application/json',
        }
        axios.post( url, {data : username}, { headers: headers })
            .then( res => { 
                dispatch(fetchResultSuccess(res.data));
            } )
            .catch( err => {
                dispatch(fetchQuestionsFail(err));
            } );
    };
};

