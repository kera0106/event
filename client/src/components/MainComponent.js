import {Component} from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import HomePage from "./HomeComponent"


class Main extends Component{

    render() {
        return(
            <div>
                <Routes>
                    <Route path='/home' element={<HomePage/>}/>
                    <Route path="*" element={<Navigate to ="/home" />}/>
                </Routes>
            </div>
        )
    }
}

export default Main