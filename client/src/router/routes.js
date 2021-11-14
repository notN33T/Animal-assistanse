import React                          from 'react';
import AuthPage                       from '../pages/AuthComponents/AuthPage'
import HomePage                       from '../pages/HomeComponents/HomePage'
import AdminPage                      from '../pages/AdminComponents/AdminPage'
import PostPage                       from '../pages/PostComponent/PostPage'
import { Switch, Route, Redirect}     from "react-router-dom";


export const useRoutes = (isAuthenticated, admin) => {
    return (
      <Switch>
                    <Route path="/" component={ HomePage } exact />
{!isAuthenticated ? <Route path="/auth" component={ AuthPage } exact /> : null}
{admin            ? <Route path="/admin" component={ AdminPage } exact /> : null}
                    <Route path="/post:postId" component={ PostPage } exact />
            <Redirect to="/" />
      </Switch >
    )
}

