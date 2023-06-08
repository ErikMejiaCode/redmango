import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Storage/Redux/store";
import { cartItemInterface, userInterface } from "../../Interfaces";
import {
  emptyUserState,
  setLoggedInUser,
} from "../../Storage/Redux/UserAuthSlice";

let logo = require("../../Assets/Images/mango.png");

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shoppingCartFromStore: cartItemInterface[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );

  const userData: userInterface = useSelector(
    (state: RootState) => state.userAuthStore
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(setLoggedInUser({ ...emptyUserState }));
    navigate("/");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="nav-link" aria-current="page" to="/">
            <img src={logo} style={{ height: "40px" }} className="m-1" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto mb-2 mb-lg-0 w-100">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/shoppingcart">
                  <i className="bi bi-cart"></i>{" "}
                  {userData.id && `(${shoppingCartFromStore.length})`}
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <NavLink className="nav-link" to="/authentication">
                  Authentication
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/authorization">
                  Authorization
                </NavLink>
              </li> */}

              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Admin Panel
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </div>
              </li>
              <div className="d-flex" style={{ marginLeft: "auto" }}>
                {userData.id && (
                  <>
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        style={{
                          cursor: "pointer",
                          background: "transparent",
                          border: 0,
                        }}
                      >
                        Welcome, {userData.fullName}
                      </button>
                    </li>

                    <li className="nav-item">
                      <button
                        className="btn btn-success btn-outline rounded-pill text-white mx-2"
                        style={{
                          border: "none",
                          height: "40px",
                          width: "100px",
                        }}
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                {!userData.id && (
                  <>
                    <li className="nav-item text-white">
                      <NavLink className="nav-link" to="/register">
                        Register
                      </NavLink>
                    </li>
                    <li className="nav-item text-white">
                      <NavLink
                        className="btn btn-success btn-outline rounded-pill text-white mx-2"
                        to="/login"
                      >
                        Login
                      </NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Header;
