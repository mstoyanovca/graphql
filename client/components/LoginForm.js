import React, { Component, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';
import { useMutation } from '@apollo/client/react';

import App from './App.js';
import Header from './Header.js';
import AuthForm from './AuthForm.js';

import query from '../queries/CurrentUser.js';
import mutation from '../mutations/Login.js';

const LoginForm  = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState(null);

    const { data, loading, error } = useQuery(query);
    if(data) {
        const navigate = useNavigate();
        navigate('/dashboard');
    }

    const onSubmit = () => {
        const { id, email } = useMutation(mutation, {
            variables: {
                email: formState.email,
                password: formState.password
            },
            refetchQueries: [{query}]
        }).catch(res => {
            const errors = res.graphQLErrors.map(error => error.message);
            setErrorMessage(errors);
        });
    }

    return(
        <div id="login" className="container">
            <Header />
            <h4>Login</h4>
            <AuthForm errors={errorMessage} onSubmit={onSubmit.bind(this)} />
        </div>
    );
}

export default LoginForm;
