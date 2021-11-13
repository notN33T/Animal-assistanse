import React                          from 'react';
import AuthPage                       from '../pages/AuthComponents/AuthPage'
import HomePage                       from '../pages/HomeComponents/HomePage'
import AdminPage                      from '../pages/AdminComponents/AdminPage'
import { Switch, Route, Redirect }    from "react-router-dom";

export const useRoutes = (isAuthenticated, admin) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        {admin ? 
        <Route path="/admin" exact>
          <AdminPage />
        </Route> 
        : null}
        <Redirect to="/" />
      </Switch >
    )
  }
  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  )
}

