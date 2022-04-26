import React from "react";
import { Link } from "react-router-dom";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux-store/user/user.slice";

const MenuBar = () => {
    const userName = useSelector((state) => state.user.userName);
    const dispatch = useDispatch();

    const handleLogOut = () => {
        dispatch(userActions.logoutUser())
    }

    return (
        <Navbar className="navbar-dark px-3 px-lg-5" bg="dark" expand="lg">
            <Link className="navbar-brand" to="/">Mini Game App</Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <li className="nav-item mx-lg-4">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <NavDropdown className="nav-item mx-lg-4"
                        id="navbarDropdownMenuLink"
                        title="Game List"
                        menuVariant="dark">
                        <Link className="dropdown-item my-2" to="/game/memory-game">Memory Game</Link>
                        <Link className="dropdown-item my-2" to="/game/">Game</Link>
                        <Link className="dropdown-item my-2" to="/game/">Game</Link>
                    </NavDropdown>
                    <li className="nav-item mx-lg-4">
                        <Link className="nav-link" to="/gift">Gift</Link>
                    </li>
                    <li className="nav-item mx-lg-4">
                        <Link className="nav-link" to="/about-us">About Us</Link>
                    </li>
                </Nav>
                <Navbar.Collapse className="justify-content-end navbar-dark my-lg-2">
                    <Navbar.Text>
                        User: <Link to="/login" onClick={() => handleLogOut()}>{userName}</Link>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MenuBar;