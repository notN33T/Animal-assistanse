import React                          from 'react';
import AuthPage                       from '../pages/AuthComponents/AuthPage'
import HomePage                       from '../pages/HomeComponents/HomePage'
import AdminPage                      from '../pages/AdminComponents/AdminPage'
import PostPage                       from '../pages/PostComponent/PostPage'
import Page404                        from '../pages/Page404/Page404'
import AboutPage                      from '../pages/AboutPage/AboutPage'
import DonatePage                     from '../pages/DonatePage/DonatePage'
import ProfilePage                    from '../pages/ProfilePage/ProfilePage'  
import { Switch, Route, Redirect}     from "react-router-dom";


export const useRoutes = (isAuthenticated, admin) => {
    return (
      <Switch>
                    <Route path="/" component={ HomePage } exact />
{!isAuthenticated ? <Route path="/auth" component={ AuthPage } exact /> 
                  : <Route path="/auth" component={ HomePage } exact />}
{admin            ? <Route path="/admin" component={ AdminPage } exact /> : null}
                    <Route path="/post:postId" component={ PostPage } exact />
                    <Route path="/about" component={ AboutPage } exact/>
                    <Route path="/404" component= {Page404} exact />
                    <Route path="/donate" component={DonatePage} exact/>
                    <Route path="/profile" component={ProfilePage} exact/>
            <Redirect to="/404" />
      </Switch >
    )
}

