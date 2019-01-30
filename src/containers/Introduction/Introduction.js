import React from 'react';
import Input from '../../components/UI/Input/Input';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import styled from 'styled-components';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';


const FormWrapper = styled.div`
    margin: 20px auto;
    width: 80%;
    text-align: center;
    box-shadow: 0 2px 3px #ccc;
    border: 1px solid #fcfcfc;
    padding: 10px;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 14px;
	font-weight: normal;
	font-style: normal;
	font-stretch: normal;
	line-height: normal;
	letter-spacing: 0.4px;
	color: #383e39;
    @media (min-width: 600px) {	 
	    width: 500px;
	}
`;

const Title = styled.h3`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

class Introduction extends React.Component{
	state = {
        controls: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'name',
                    placeholder: 'Enter your name...'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
        },
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

	render(){
		const formElementsArray = [];
        const username = this.state.controls.name.value!=='' ? this.state.controls.name.value : '';
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

		let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );
		return(
			<div>
				<Title>Welcome to Personality Test! Hope you have a nice experience.</Title>
				<FormWrapper>
	                {form}
                    <Link to={{ pathname: '/questionnaire', state: { username: username } }}>
                        <Button>Proceed to Test</Button>
                    </Link>
	            </FormWrapper>
			</div>
		);
	}
}

const mapStateToProps = state =>{
    return {
        username: state.testQuestions.username,
    }
}

const mapDispatchToProps = dispatch =>{
	return{
		initTest : ( username ) => dispatch( actions.initTest( username ) ),
	}
};

export default connect( mapStateToProps, mapDispatchToProps )( Introduction );