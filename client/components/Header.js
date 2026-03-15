import React, { Component } from 'react';
import {Link} from 'react-router';
import { useQuery } from '@apollo/client/react';

import query from '../queries/CurrentUser.js';
import mutation from '../mutations/Logout.js';

const Header = () => {
    const onLogoutClick = () => {
        this.props.mutate({
            refetchQueries: [{ query }]
        });
    }

    const renderButtons = () => {
        const { data, loading, error } = useQuery(query);
        if(loading) { return <div />; }
        if(data) {
            return (
                <li>
                    <a onClick={this.onLogoutClick.bind(this)}>Logout</a>>
                </li>
            );
        } else {
            return (
                <div>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            );
        }
    }

    return(
        <nav>
            <div className="nav-wrapper">
                <Link to="/" className="brand-logo left">
                    Home
                </Link>
                <ul className="right">
                    {renderButtons()}
                </ul>
            </div>
        </nav>
    );
}

// export default graphql(mutation) (graphql(query)(Header));
export default Header;
