import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import useAuth from '../../useFirebase/hooks/useAuth';

const UserRoute = ({ children, ...rest }) => {
    const { user } = useAuth();
    return (
        <Route {...rest}
            render={({ location }) =>
                !user.email ? children : <Redirect
                    to={{
                        pathname: "/",
                        state: { from: location }
                    }} />} />

    )
};

export default UserRoute;