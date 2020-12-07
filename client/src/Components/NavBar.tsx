import Axios, { AxiosResponse } from "axios";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { myContext } from "../Pages/Context";
import { Button, Navbar } from "react-bootstrap";

function NavBar() {
  const ctx = useContext(myContext);

  //Logout request function
  const logout = () => {
    Axios.get("http://localhost:4000/logout", {
      withCredentials: true, //Se usa para que el backend pueda leer la cookie
    }).then((res: AxiosResponse) => {
      if (res.data === "success") {
        window.location.href = "/";
      }
    });
  };

  return (
    <Navbar className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <div className="nav-item">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
          </Link>
            </li>
          </ul>
        </div>
        {ctx ? (
          <React.Fragment>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" onClick={logout} to="/logout">
                    Logout
                  </Link>
                </li>
                {ctx.isAdmin ? (
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin">Admin</Link>
                  </li>
                ) : null}{" "}
                {/*Si soy admin entonces me podre meter en la pagina de admin */}
                <Link className="nav-link" to="/profile">Profile</Link>
              </ul>
            </div>
          </React.Fragment>
        ) : (
            <>
              {/*Si ctx (Informacion del usuario logeado) existe entonces muestra estos elementos del navbar */}
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                  </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                  </Link>
                  </li>
                </ul>
              </div>
            </>
          )}

        <Button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </Button>
      </div>
    </Navbar>
  );
}

export default NavBar;
