import React from 'react';
import SkeletonLoader from '../../components/UI/Spinner/SkeletonLoader';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-test';

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

// Create a Wrapper component that'll render a <section> tag with some styles
const Wrapper = styled.section`
  padding: 10px;
  background: papayawhip;
`;


class TestResult extends React.Component {
	state={
		testResultLoading:true, 
		allTestResult : [],
		isToken : false,
	}
	componentDidMount(){
		const { location, onInitTestResult } = this.props;
        const username = location.state && location.state.username ? location.state.username : 'Guest User';
		onInitTestResult( username );
	}

	static getDerivedStateFromProps( props, state ) {
	    if ( props.isResultsloading === false ) {
	      	 return {
	      	 	testResultLoading : props.isResultsloading,
	      	 }
	    }
	    return false;
	}

	render(){

		const { isResultsloading, submittedTestResult } = this.props;
		 
		const Loader =  isResultsloading === true ? <div><SkeletonLoader /><SkeletonLoader /><SkeletonLoader /><SkeletonLoader /></div>
		: 'Sorry, No Results found!';

		const Results = submittedTestResult ? Object.keys(submittedTestResult).map((key)=>{
			return (
					<div key={key}>
						<Title>Question ({submittedTestResult[key].question_id}): {submittedTestResult[key].question}</Title>
						<Title>Answered : {submittedTestResult[key].answer}</Title>
					</div>				
			);
		}): Loader;	

		return(
			<Wrapper>{Results}</Wrapper>
		);
	}
}

const mapStateToProps = state =>{
	return {
		submittedTestResult: state.testQuestions.testResult,
		isResultsloading: state.testQuestions.isResultsloading,
	}
}
const mapDispatchToProps = dispatch => {
    return {
        onInitTestResult: (username ) => dispatch(actions.getTestResultsByUsername( username ))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler( TestResult, axios ));