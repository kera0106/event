import React, {Component} from "react";
import {
    Nav,
    NavItem,
    Navbar,
    NavbarToggler,
    Collapse,
    Button,
    NavbarBrand,
    NavbarText, Modal, ModalHeader, ModalBody, Row, Label, Col
} from "reactstrap";
import {NavLink} from "react-router-dom";
import {Control, Errors, Form} from 'react-redux-form';
import serverApi from "../api/serverApi";

const LoginAlreadyExists = ({isLoginExists}) => {
    if (isLoginExists)
        return(
            <p className="text-danger m-2">
                Указанный логин уже используется
            </p>
        )
    else
        return(
            <React.Fragment></React.Fragment>
        )
}

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            isErrorWindowOpen: false,
            isLoginAlreadyExists: false,
            errorMessage: ''
        }

        this.toggleNav = this.toggleNav.bind(this)
        this.toggleErrorWindow = this.toggleErrorWindow.bind(this)
        this.toggleModal = this.toggleModal.bind(this)
        this.minLength = this.minLength.bind(this)
        this.maxLength = this.maxLength.bind(this)
        this.validSymbolsInLogin = this.validSymbolsInLogin.bind(this)
    }

    toggleNav() {
        this.setState({isNavOpen: !this.state.isNavOpen})
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    toggleErrorWindow() {
        this.setState({isErrorWindowOpen: !this.state.isErrorWindowOpen})
    }

    handleSubmit(values) {
        const id = localStorage.getItem('userId')
        serverApi.editAccount(id, {
            "login": values.login,
            "firstname": values.firstname,
            "lastname": values.lastname
        }).then(response => {
                if (response) {
                    return response;
                } else {
                    let error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
            error => {
                if (error.response) {
                    if (typeof error.response.data === 'object')
                        throw new Error("Неизвестная ошибка")
                    throw new Error(error.response.data)
                }
                throw new Error(error.message);
            })
            .then(resolve => window.location.reload())
            .catch(error => {
                if (error.message === 'Указанный логин уже используется'){
                    this.setState({isLoginAlreadyExists: true})
                }
                else {
                    this.toggleModal();
                    this.setState({errorMessage: error.message})
                    this.toggleErrorWindow();
                }
            })
    }

    minLength = (len) => (val) => {
        return  (val) && !(val.length <= len)
    }

    maxLength = (len) => (val) => {
        return  !(val.length > len)
    }

    validSymbolsInLogin = () => (val) => {
        this.setState({isLoginAlreadyExists: false})
        return /^[A-Z0-9]*$/i.test(val)
    }

    validSymbolsInName = () => (val) => {
        return /^[A-ZА-Я]*$/i.test(val)
    }

    render() {

        const renderName = () => {
            if (this.props.name.firstname && this.props.name.lastname)
                return this.props.name.firstname + " " + this.props.name.lastname
            else
                return ""
        }

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
                                <NavbarText className="name me-3 mt-0">
                                    {renderName()}
                                </NavbarText>
                                <NavItem>
                                    <Button className="me-3 mt-1" onClick={this.toggleModal}><span className="fa fa-cogs fa-lg"></span> Настройки</Button>
                                </NavItem>
                                <NavItem>
                                    <Button className="mt-3 mt-md-1" onClick={this.toggleModal}><span className="fa fa-sign-out fa-lg"></span> Выход</Button>
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
                <Modal centered={true} className="me-2 me-sm-auto" isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Настройки</ModalHeader>
                    <ModalBody>
                        <Form model="settingForm" onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label className="d-none d-md-flex" htmlFor="login" md={2}>Логин</Label>
                                <Col md={10}>
                                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                                    <Control.text model='.login' id="login" name="login"
                                                  placeholder="Логин"
                                                  className='form-control'
                                                  validators={{
                                                      minLength: this.minLength(3),
                                                      maxLength: this.maxLength(15),
                                                      validSymbols: this.validSymbolsInLogin()
                                                  }
                                                  }
                                    />
                                    <LoginAlreadyExists isLoginExists={this.state.isLoginAlreadyExists}/>
                                    <Errors
                                        className="text-danger m-2"
                                        model=".login"
                                        show="touched"
                                        messages={{
                                            minLength: 'Слишком короткий логин',
                                            maxLength: 'Слишком длинный логин'
                                        }}
                                    />
                                    <Errors
                                        className="text-danger m-2"
                                        model=".login"
                                        show="touched"
                                        messages={{
                                            validSymbols: 'Логин может содержать только цифры или символы латинского алфавита'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group mt-3'>
                                <Label className="d-none d-md-flex" htmlFor="firstname" md={2}>Имя</Label>
                                <Col md={10}>
                                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                                    <Control.text model='.firstname' id="firstname" name="firstname"
                                                  placeholder="Имя"
                                                  className='form-control'
                                                  validators={{
                                                      minLength: this.minLength(2),
                                                      maxLength: this.maxLength(12),
                                                      validSymbols: this.validSymbolsInName()
                                                  }
                                                  }
                                    />
                                    <Errors
                                        className="text-danger m-2"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            minLength: 'Слишком короткое имя',
                                            maxLength: 'Слишком длинное имя'
                                        }}
                                    />
                                    <Errors
                                        className="text-danger m-2"
                                        model=".firstname"
                                        show="touched"
                                        messages={{
                                            validSymbols: 'Имя может состоять только из символов латинского или русского алфавита'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group mt-3'>
                                <Label className="d-none d-md-flex" htmlFor="lastname" md={2}>Фамилия</Label>
                                <Col md={10}>
                                    {/* eslint-disable-next-line react/jsx-pascal-case */}
                                    <Control.text model='.lastname' id="lastname" name="lastname"
                                                  placeholder="Фамилия"
                                                  className='form-control'
                                                  validators={{
                                                      minLength: this.minLength(2),
                                                      maxLength: this.maxLength(12),
                                                      validSymbols: this.validSymbolsInName()
                                                  }
                                                  }
                                    />
                                    <Errors
                                        className="text-danger m-2"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            minLength: 'Слишком короткая фамилия',
                                            maxLength: 'Слишком длинная фамилия'
                                        }}
                                    />
                                    <Errors
                                        className="text-danger m-2"
                                        model=".lastname"
                                        show="touched"
                                        messages={{
                                            validSymbols: 'Фамилия может состоять только из символов латинского или русского алфавита'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col className="mt-5" xs={{size:10, offset: 1}} md={{size:6, offset: 3}}>
                                    <Button className="w-100" type="submit" color="primary">
                                        Изменить
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal centered={true} className="me-2 me-sm-auto" isOpen={this.state.isErrorWindowOpen} toggle={this.toggleErrorWindow}>
                    <ModalHeader toggle={this.toggleErrorWindow}>Произошла ошибка</ModalHeader>
                    <ModalBody>
                        <h3>{this.state.errorMessage}</h3>
                        <Col className="mt-5" md={{size:6, offset: 3}}>
                            <Button onClick={this.toggleErrorWindow} className="w-100" type="submit" color="primary">
                                Понятно
                            </Button>
                        </Col>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

}

export default Header