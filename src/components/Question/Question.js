import React from 'react';
import styled from 'styled-components';
import Button from '../../components/UI/Button/Button';
import Radio from '../../components/UI/Radio/Radio';

const QuestionCardWrapper = styled.div`
	position: relative;
    width: 67%;
    margin: 3% 0 0 0;
    height: auto;
    left:35%;
    @media (max-width: 1023px) {
	    left: 10px;
	    width: 80%;
	}
`;


const ButtonWrapper = styled.div`
	position: absolute;
	bottom: 8%;
	display: inline-block;
	width:100%;
	text-align: left;
	left: 36%;
	@media (max-width: 1023px) {
		position: fixed;
	    bottom: 0;
	    margin:1%;
	    width: 98%;
		text-align: center;
		left: 0;
	}
`; 

const QuestionRow = styled.div`
	max-width:90%;
	text-align:left;
	font-size: 16px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: 0.5px;
	color: #383e39;
	@media (max-width: 1023px) {
	    text-align: left;
	    max-width:100%;
	}
`;

const commonStyles = {
	hide: {
		position:'absolute',
		left: '20%',
		visibility: 'hidden',
		opacity: '0',
	},
	show: {
		visibility: 'visible',
      	opacity: 1,
      	transition: 'all 0.7s linear',
	},
	isActive: {
		active: 'active'
	},
	showConditionGrid: {
		display: 'block',
	},
	hideConditionGrid: {
		display: 'none',
	}
}

const OptionWrapper = styled.span`
	text-transform: capitalize;
    display: block;
    margin: 10px;
    text-align: left;
	input {
		cursor:pointer;
	}
	@media (max-width: 1023px) {
	    text-align: left;
	}
	`;

const Question = ( props )=>{
	const { question_id,
		activeQuestion,
		question,
		nextQuestion,
		prevQuestion,
		question_type,
		condition_text,
		conditional_option,
		conditional_question,
		conditional_question_type,
		options,
		showCondition,
		conditional_question_id,
		questionCount,
		inputChangedHandler,
		personalityTestForm
	} = props;

	const activeStyle 			= activeQuestion === question_id ?
	commonStyles.show 			: commonStyles.hide;
	const activeBtnStyle 			= activeQuestion === question_id ?
	commonStyles.showConditionGrid 			: commonStyles.hideConditionGrid;
	const arrOptions 			= options.split("|");
	const arrConditionalOpt 	= conditional_option && conditional_option.split("|"); 
	const showConditionStyle 	= showCondition === true 
	&& conditional_question_id === question_id ?
	 commonStyles.showConditionGrid :
	 commonStyles.hideConditionGrid; 
	const btnNext = questionCount === question_id ? 'Submit' : 'Next';   
 
	const QuestionOptions =  ( question_type === 'single_choice' || question_type === 'single_choice_conditional' ) ? arrOptions.map((option)=>{
		const isChecked = Object.keys(personalityTestForm).find(key => personalityTestForm[key].question_id === question_id && personalityTestForm[key].answer === option) ? "checked" : "";
		return(
			<OptionWrapper key={`${question_id}__${Math.random()}`}>
				<Radio label={option} 
				 change={(event)=>inputChangedHandler(event, question,question_id, condition_text, option)}
				 checked={isChecked} 
				 name={`${question_id}_options`}
				 value={option}
				/>
			</OptionWrapper>
		);
	}):'';

	const QuestionOptionsConditional =  conditional_option && ( conditional_question_type === 'single_choice' || conditional_question_type === 'number_range' ) ? arrConditionalOpt.map((cOption)=>{
		const isConditionalChecked = Object.keys(personalityTestForm).find(key => personalityTestForm[key].condition_id === conditional_question_id && personalityTestForm[key].answer === cOption) ? "checked" : "";
		return(
			<OptionWrapper key={`${question_id}__${Math.random()}_conditional`}>
				<Radio label={cOption}
				 change={(event)=>inputChangedHandler( event, conditional_question,question_id, condition_text, cOption, conditional_question_id )}
				 checked={isConditionalChecked}
				 name={`${question_id}_cOptions`}
				 value={cOption}
				/>
			</OptionWrapper>
		);
	}):'';
	
	return(
		<div>
			<div>
				<QuestionCardWrapper style={activeStyle}>
				<QuestionRow><strong>Q.({question_id}) {question}</strong></QuestionRow>
				<QuestionRow>{QuestionOptions}</QuestionRow>
				<QuestionRow style={showConditionStyle}><strong>Q. { conditional_question }</strong></QuestionRow>
				<QuestionRow style={showConditionStyle}>{QuestionOptionsConditional}</QuestionRow>
				</QuestionCardWrapper>
			</div>
			<ButtonWrapper style={activeBtnStyle}>
				<Button clicked={()=>prevQuestion(question_id, questionCount)}>Previous</Button>
				<Button clicked={()=>nextQuestion(question_id, questionCount)}>{btnNext}</Button>
			</ButtonWrapper>
		</div>
	);
}
export default Question;