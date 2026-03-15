import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client/react';

import currentUserQuery from '../queries/CurrentUser.js';

const RequireAuth = () => {
    const { data, loading, error } = useQuery(currentUserQuery);

    if(!loading || !data) {
        const navigate = useNavigate();
        navigate('/login');
    }

        /*componentWillUpdate(nextProps) {
            if(!nextProps.data.loading && !nextProps.data.user) {
                const navigate = useNavigate();
                navigate('/login');
            }
        }*/

    return {...this.props};
};

export default RequireAuth;
