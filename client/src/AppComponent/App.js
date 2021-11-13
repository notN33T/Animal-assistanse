import React                          from 'react';
import { useAuth }                    from '../hooks/auth.hook'
import { AuthContext }                from '../context/AuthContext'
import { useRoutes }                  from '../router/routes'
import { BrowserRouter as Router }    from 'react-router-dom'
import Loading                        from '../pages/Common/Loading/Loading'
import '../static/css/reset.css'

function App() {
  const { token, login, logout, admin, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated, admin)  
  if (!!ready){
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
  return ( <Loading/> )
  

}
export default App;