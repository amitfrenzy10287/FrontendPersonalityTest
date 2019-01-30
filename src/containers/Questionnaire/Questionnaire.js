import React from 'react';
import SkeletonLoader from '../../components/UI/Spinner/SkeletonLoader';
import Question from '../../components/Question/Question';
import ProgressBar from '../../components/UI/ProgressBar/ProgressBar';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import styled from 'styled-components';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-test';
 
const Wrapper = styled.section`
	position: relative;
	width: 50%;
    margin-left: 23%;
	min-height: 550px;
	height: 100%;
	padding: 1%;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
	@media (max-width: 1023px) {
	    box-shadow: none;
	    padding: 0;
	    width: 100%;
		margin-left: 0;
	}
`;

class Questionnaire extends React.Component{
	constructor(props){
		super(props);
		this.state = {			
			activeQuestion: 1,
			showCondition:false,
			barWidth:0,
			totalQuestions: 0,
			personalityTestForm:[],
	        formIsValid: false,
	        isTestSubmit:false,
	        isTestSubmitContinue: false,
	        submitTestResult: false,
		}
	}

	nextQuestion =( question_id, questionCount ) => {
		const percentage = questionCount > 0 ?  parseFloat(100 / questionCount ) : 10;
		let barWidth = this.state.barWidth < 100 ? this.state.barWidth + percentage : this.state.barWidth;
		const questId = question_id!==questionCount ? question_id + 1 : question_id;
		if ( question_id === questionCount) {
			barWidth = 100;
			this.setState({ activeQuestion : questId, barWidth: Math.round( barWidth ), isTestSubmit: true, isTestSubmitContinue: true  } );
		} else {
			this.setState({ activeQuestion : question_id + 1, barWidth: Math.round( barWidth ) } );
		}
	}

	prevQuestion =( question_id, questionCount ) => {
		const percentage = questionCount > 0 ?  parseFloat(100 / questionCount ) : 10;
		const barWidth = this.state.barWidth >= percentage ? this.state.barWidth - percentage : this.state.barWidth;
		const questId = question_id - 1!==0 ? question_id - 1 : question_id;
		this.setState( { activeQuestion : questId , barWidth: Math.round( barWidth ) } );
	}

	conditionalText = ( conditionalText, selectedOption )=>{
		if ( conditionalText === selectedOption ) {
			this.setState({ showCondition : true });
		}else{
			this.setState({ showCondition : false });
		}
	}

	inputChangedHandler = ( event, question, question_id, conditionalText, selectedOption, condition_id ) => {
		const updatedFormElement = [];
        updatedFormElement.push(...this.state.personalityTestForm , {
            question_id: question_id,
            condition_id: condition_id,
			question: question,
			answer: event.target.value
        });

		if ( conditionalText && conditionalText === selectedOption ) {
			this.setState({personalityTestForm: updatedFormElement, showCondition : true });
		}else{
			this.setState({personalityTestForm : updatedFormElement });
		}
    } 

    testCancelHandler =()=>{
    	this.setState({isTestSubmitContinue: false});
    }

    submitHandler = () => {
    	const { onSubmitTest, token, location } = this.props; 
        const username = location.state.username ? location.state.username : 'Guest User';
        onSubmitTest( username, this.state.personalityTestForm, token);
        this.setState({ isTestSubmitContinue: false, submitTestResult : <Redirect to={{ pathname: '/results', state: { username: username } }} /> });
    }
	
	render(){
		const { questions, isQuestionsloading } = this.props;
		let TestScreen = isQuestionsloading === true ? <SkeletonLoader /> : '';
		const activeQuestion = this.state.activeQuestion ? this.state.activeQuestion : 1;
		let redirectToResult = this.state.submitTestResult;

		TestScreen = questions && Object.keys(questions).map((key)=>{
			return <Question 
				isTestSubmit={this.state.isTestSubmit}
				submitHandler={this.submitHandler}
				inputChangedHandler={this.inputChangedHandler}
				questionCount={questions.length}
				personalityTestForm={this.state.personalityTestForm}
				activeQuestion={activeQuestion}
			 	nextQuestion={this.nextQuestion}
			 	conditionalText={this.conditionalText}
			 	showCondition={this.state.showCondition}
			  	prevQuestion={this.prevQuestion}
			  	key={key} {...questions[key]} />
		});
		
		return(
			<Wrapper>
				{redirectToResult}
				<Modal show={this.state.isTestSubmitContinue} >
                    <p>Are you sure you want to submit this test ?</p>
                    <div>
	                    <Button clicked={(e)=>this.submitHandler(e)}>Continue</Button>
	                    <Button clicked={this.testCancelHandler}>Cancel</Button>
                    </div>
                </Modal>
				<ProgressBar barWidth={this.state.barWidth} />
				{TestScreen}
			</Wrapper>
		);
	}
	
}

const mapStateToProps = state =>{
	return {
		token : state.auth.token,
		questions : state.testQuestions.questions,
		submittedTestResult: state.testQuestions.submittedTestResult,
	}
}
const mapDispatchToProps = dispatch => {
    return {
        onSubmitTest: (username, personalityTestForm, token) => dispatch(actions.submitTest(username, personalityTestForm, token))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(withErrorHandler( Questionnaire, axios ));
