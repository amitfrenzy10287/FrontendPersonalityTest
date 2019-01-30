import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    questions: [],
    isQuestionsloading: false,
    isResultloading: false,
    submittedTestResult: false,
    testResult: [],    
    username:'',
    isResultsloading:false,
};

const fetchQuestionsStart = ( state, action ) => {
    return updateObject( state, { isQuestionsloading: true } );
};

const fetchQuestionsSuccess = ( state, action ) => {
    return updateObject( state, {
        isQuestionsloading: false,
        questions: action.questions
    } );
};

const fetchQuestionsFail = ( state, action ) => {
    return updateObject( state, { isQuestionsloading: false } );
};

const submitTestStart = ( state, action ) => {
    return updateObject( state, { isResultloading: true } );
};

const initTest = ( state, action ) => {
    return updateObject( state, { username: action.username } );
};

const submitTestSuccess = ( state, action ) => {
    return updateObject( state, {
        isResultloading: false,
        submittedTestResult : true,
    } );
};

const submitTestFail = ( state, action ) => {
    return updateObject( state, { isResultloading: false } );
};


const fetchResultsStart = ( state, action ) => {
    return updateObject( state, { isResultsloading: true } );
};

const fetchResultsSuccess = ( state, action ) => {
    return updateObject( state, {
        isResultsloading: false,
        testResult: action.results,
    } );
};

const fetchResultsFail = ( state, action ) => {
    return updateObject( state, { isResultsloading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.FETCH_QUESTIONS_START: return fetchQuestionsStart( state, action );
        case actionTypes.FETCH_QUESTIONS_SUCCESS: return fetchQuestionsSuccess( state, action );
        case actionTypes.FETCH_QUESTIONS_FAIL: return fetchQuestionsFail( state, action );

        case actionTypes.FETCH_RESULT_START: return fetchResultsStart( state, action );
        case actionTypes.FETCH_RESULT_SUCCESS: return fetchResultsSuccess( state, action );
        case actionTypes.FETCH_RESULT_FAIL: return fetchResultsFail( state, action );

        case actionTypes.SUBMIT_TEST_START: return submitTestStart( state, action );
        case actionTypes.SUBMIT_TEST_SUCCESS: return submitTestSuccess( state, action );
        case actionTypes.SUBMIT_TEST_FAIL: return submitTestFail( state, action );
        case actionTypes.INIT_TEST: return initTest( state, action );

        default: return state;
    }
};

export default reducer;