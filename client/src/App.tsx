import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './Components/NavBar';
import AdminPage from './Pages/AdminPage';
import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import './main.css'
import Register from './Pages/Register';
import { myContext } from './Pages/Context'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  const ctx = useContext(myContext) //Esto contiene la informacion del usuario, si esta logeado y si es o no admin

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/' exact component={Homepage}></Route>

        
        {
          ctx ? (

            <>
              {ctx.isAdmin ? <Route path="/admin" component={AdminPage}></Route> : null}
              <Route path="/profile" component={Profile}></Route>
            </>
          ) : (
              <>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
              </>
            )
        }


      </Switch>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
