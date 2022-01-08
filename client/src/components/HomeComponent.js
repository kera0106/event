import React, {Component} from "react"
import Events from "./EventsComponent";
import EventManager from "./EventManagerComponent";

class HomePage extends Component {
    render() {
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-9">
                            <Events/>
                        </div>
                        <div className="col-12 col-lg-10 offset-lg-1 col-xl-3 offset-xl-0">
                            <EventManager/>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default HomePage