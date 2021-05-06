import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./NavigationMenu.css";
// import "../Layout/Layout.css";
import { FaUserCircle, FaSearch, FaTh } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";
import { FormControl, InputGroup, Button } from "react-bootstrap";

function NavigationMenu(props) {
  const [navbarCollapsed, setNavbarCollapsed] = useState(false);
  const [navbarClassName, setNavbarClassName] = useState(
    "collapse navbar-collapse"
  );
  // const [cartQty] = useState(props.cartQty);

  const menuItems = [
    { id: 1, text: "Home", url: "/" },
    { id: 2, text: "Pet Sitters", url: "/Providers" },
    { id: 3, text: "About Us", url: "/About" },
    { id: 4, text: "Contact", url: "/Contact" },
  ];

  const toggleNavbar = () => {
    setNavbarCollapsed(!navbarCollapsed);
    navbarCollapsed
      ? setNavbarClassName("collapse navbar-collapse")
      : setNavbarClassName("collapse navbar-collapse show");
  };

  return (
    <nav className="navbar navbar-expand-sm text-white bg-theme">
      <Link to="/" className="navbar-brand ml-5">
        <img src={Logo} alt="Furr Real Logo" width="60px" />
      </Link>{" "}
      <button className="navbar-toggler" type="button" onClick={toggleNavbar}>
        <FiMenu className="text-white login-icon" />
      </button>
      <div className={navbarClassName}>
        <ul className="navbar-nav ml-auto mr-5">
          {menuItems.map((item) => {
            return (
              <li key={item.id} className="nav-item">
                <Link to={item.url} className="nav-link text-white">
                  {item.text}
                </Link>
              </li>
            );
          })}
          <li className="nav-item">
            <InputGroup className="mx-1 text-center outline-0">
              <FormControl placeholder="Search" />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onChange={(e) => {
                    console.log(e.target.value);
                  }}
                >
                  <FaSearch className="search-icon" />
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </li>
          <li className="nav-item">
            <Link to="/Favorites" className="nav-link text-white">
              <FaTh className="login-icon ml-2" />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/Login" className="nav-link text-white">
              <FaUserCircle className="login-icon ml-2" />
            </Link>
          </li>
          {/*  <li className="nav-item">
            <Link to="/Cart" className="nav-link text-white">
              <FaShoppingCart className="cart-icon" />
              <span className="badge badge-notify">{cartQty}</span>
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(NavigationMenu);
