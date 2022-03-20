import {Component} from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import HomePage from "./HomeComponent"
import Invitation from "./InvitationComponent";
import Header from "./HeaderComponent";
import {connect} from "react-redux";
import {getAccountData, getInvitations} from "../redux/ActionCreators";
import EventInfo from "./EventInfoComponent";
import CreateEventComponent from "./CreateEventComponent";
import CreateConflictActivities from "./CreateConflictActivitiesComponent";
import EditEvent from "./EditEventComponent";
import EditConflictActivities from "./EditConflictActivitiesComponent";
import InvitationEventInfo from "./InvitationEventInfoComponent";

const mapStateToProps = state => {
    return {
        accountData: state.accountData,
        invitations: state.invitations
    }
}

const mapDispatchToProps = dispatch => ({
    getAccountData: () => { dispatch(getAccountData())},
    getInvitationsEvents: () => { dispatch(getInvitations())},
});

class Main extends Component{
    componentDidMount() {
        this.props.getAccountData()
        this.props.getInvitationsEvents()
    }

    render() {
        const name = {
            id: this.props.accountData.data.id,
            login: this.props.accountData.data.login,
            firstname: this.props.accountData.data.firstname,
            lastname: this.props.accountData.data.lastname
        }

        const events = []
        const eventAccounts = this.props.accountData.data.eventAccounts
        if (eventAccounts)
            eventAccounts.forEach(eventAccount => {
                if (eventAccount.accepted) {
                    let event = {
                        id: eventAccount.event.id,
                        name: eventAccount.event.name,
                        description: eventAccount.event.description,
                    }
                    events.push(event)
                }
        })

        const invitationsForRender = []
        const invitations = this.props.invitations.data.data
        if (invitations)
            invitations.forEach(invitation => {
                let invitationForRender = {
                    id: invitation.id,
                    name:invitation.name,
                    description: invitation.description,
                }
                invitationsForRender.push(invitationForRender)
            })

        return(
            <div>
                <Header name={name}/>
                <Routes>
                    <Route path='/home' element={<HomePage isLoading={this.props.accountData.isLoading}
                                                           errMess={this.props.accountData.errMess}
                                                           events={events}
                                                    />}/>
                    <Route path='/event/:eventId' element={<EventInfo/>}/>
                    <Route path='/invitationEvent/:eventId' element={<InvitationEventInfo/>}/>
                    <Route path='/invitations' element={<Invitation isLoading={this.props.invitations.isLoading}
                                                                    errMess={this.props.invitations.errMess}
                                                                    invitations={invitations}
                                                        />}/>
                    <Route path='/createEvent' element={<CreateEventComponent/>}/>
                    <Route path='/createConflictActivities' element={<CreateConflictActivities/>}/>
                    <Route path='/editConflictActivities' element={<EditConflictActivities/>}/>
                    <Route path='/editEvent/:eventId' element={<EditEvent/>}/>
                    <Route path="*" element={<Navigate to ="/home" />}/>
                </Routes>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)