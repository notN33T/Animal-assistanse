import React, {useState, useCallback}   from 'react';
import { useAuth }                    from './hooks/auth.hook'
import { AuthContext }                from './context/AuthContext'
import { useRoutes }                  from './router/routes'
import { BrowserRouter as Router }    from "react-router-dom"
import './static/css/style.css'
import './static/css/HomePage.css'

function App() {
  const { token, login, logout, admin } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated, admin)  
  return (
    <AuthContext.Provider value={{
      token, login, logout, isAuthenticated, admin
    }}> 
      <Router>  
        <div className="app-container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
export default App;