import React from "react";
import serverApi from '../api/serverApi'

export class SignIn extends React.Component{

    constructor() {
        super();
        this.state = {
            login: "",
            password: ""
        }
        this.onChangeLogin = this.onChangeLogin.bind(this)
        this.onChangePassword = this.onChangePassword.bind(this)
        this.signIn = this.signIn.bind(this)
    }

    onChangeLogin(e){
        this.setState({login: e.target.value})
    }

    onChangePassword(e){
        this.setState({password: e.target.value})
    }

    signIn(){
        serverApi.sign_in({login: this.state.login, password: this.state.password})
    }

    render() {
        return(
            <div>
                <p>Логин</p>
                <input placeholder="Логин" name="login" onChange={this.onChangeLogin}/>
                <p>Пароль</p>
                <input placeholder="Пароль" type="password" onChange={this.onChangePassword}/>
                <p/>
                <button onClick={this.signIn}>Зарегистрироваться</button>
            </div>)
    }
}