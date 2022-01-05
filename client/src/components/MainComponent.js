import {Component} from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import HomePage from "./HomeComponent"
import Invitation from "./InvitationComponent";
import Header from "./HeaderComponent";


class Main extends Component{

    render() {
        return(
            <div>
                <Header/>
                <Routes>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path='/invitations' element={<Invitation/>}/>
                    <Route path="*" element={<Navigate to ="/home" />}/>
                </Routes>
            </div>
        )
    }
}

export default Main