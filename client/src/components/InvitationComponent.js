import React, {Component} from "react";
import Events from "./EventsComponent";
import EventManager from "./EventManagerComponent";
import InvitationEvents from "./InvitationEventsComponent";

class Invitation extends Component{
    render() {
        return(
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-xl-9">
                            <InvitationEvents events={this.props.invitations}
                                    isLoading={this.props.isLoading}
                                    errMess={this.props.errMess}
                            />
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

export default Invitation