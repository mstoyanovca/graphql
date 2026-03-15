import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import gql from 'graphql-tag';

import Header from './Header.js';
import AuthForm from './AuthForm.js';

import mutation from '../mutations/Signup.js';
import query from '../queries/CurrentUser.js';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {errors: []};
    }

    componentWillUpdate(nextProps) {
        const navigate = useNavigate();
        if(!this.props.data.user && nextProps.data.user) {
            navigate('/dashboard');
        }
    }

    onSubmit({email, password}) {
        this.props.mutate({
            variables: {email, password},
            refetchQueries: [{query}]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            this.setState({errors});
        });
    }

    render() {
        return(
            <div className="container">
                <Header />
                <h4>Sign Up</h4>
                <AuthForm errors={this.state.errors} onSubmit={this.onSubmit.bind(this)} />
            </div>
        );
    }
}

// export default graphql(query) (graphql(mutation)(SignupForm));
export default SignupForm;
