import React, { Component, useState } from 'react';

const AuthForm = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorMessage, setErrorMessage] = useState({errors: []});

    const onSubmit = (event) => {
        event.preventDefault();
        //this.props.onSubmit(formState);
    }

    return(
        <div className="row">
            <form className="col s6" onSubmit={onSubmit.bind(this)} >
                <div className="input-field">
                    <label>Email</label>
                    <input value={formState.email} onChange={e => setFormState({email: e.target.value})} style={{marginTop: 25}} />
                </div>
                <div className="input-field">
                    <label>Password</label>
                    <input value={formState.password} onChange={e => setFormState({password: e.target.value})} style={{marginTop: 25}} type="password" />
                </div>
                <div className="errors">
                    {errorMessage.errors.map(error => <div key={error}>{error}</div>)}
                </div>
                <button className="btn">Submit</button>
            </form>
        </div>
    );
}

export default AuthForm;
