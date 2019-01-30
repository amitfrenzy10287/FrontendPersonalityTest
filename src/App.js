import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Questionnaire from './containers/Questionnaire/Questionnaire';
import Introduction from './containers/Introduction/Introduction';
import TestResults from './containers/TestResult/TestResult';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignin();
  }

  render () {
    if(this.props.token) { 
      this.props.onFetchQuestions( this.props.token );
    }
    let routes = (
      <Switch>
        <Route path="/" exact component={Introduction} />
        <Route path="/questionnaire" exact component={Questionnaire} />
        <Route path="/results" component={TestResults} />
        <Redirect to="/" />
      </Switch>
    );

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch( actions.auth() ),
    onFetchQuestions: (token) => dispatch( actions.fetchQuestions(token) )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
