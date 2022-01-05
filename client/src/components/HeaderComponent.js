import React, {Component} from "react";
import {
    Nav,
    NavItem,
    Navbar,
    NavbarToggler,
    Collapse,
    Button,
    NavbarBrand,
    NavbarText
} from "reactstrap";
import {NavLink} from "react-router-dom";

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        }

        this.toggleNav = this.toggleNav.bind(this)
    }

    toggleNav() {
        this.setState({isNavOpen: !this.state.isNavOpen})
    }

    render() {
        return(
            <div className="title-background">
                <Navbar dark expand="md">
                    <NavbarToggler onClick={this.toggleNav} />
                    <NavbarBrand className="title">Event Scheduler</NavbarBrand>
                </Navbar>
                <Navbar dark expand="md">
                    <div className="container">
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav pills className="d-none d-md-flex">
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">Мои мероприятия</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/invitations">Приглашения</NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className="ms-auto" navbar>
                                <NavbarText className="name me-3 mt-1">
                                    Фамилия Имя
                                </NavbarText>
                                <NavItem>
                                    <Button className="me-3 mt-1" onClick={this.toggleModal}><span className="fa fa-cogs fa-lg"></span> Настройки</Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="mt-1" onClick={this.toggleModal}><span className="fa fa-sign-out fa-lg"></span> Выход</Button>
                                </NavItem>
                            </Nav>
                            <Nav pills className="mt-3 mt-md-0 d-md-none">
                                <NavItem>
                                    <NavLink className="nav-link" to="/home">Мои мероприятия</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/invitations">Приглашения</NavLink>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }

}

export default Header