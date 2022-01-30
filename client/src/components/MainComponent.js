import {Component} from "react"
import {Navigate, Route, Routes} from "react-router-dom"
import HomePage from "./HomeComponent"
import Invitation from "./InvitationComponent";
import Header from "./HeaderComponent";
import {connect} from "react-redux";
import {getAccountData} from "../redux/ActionCreators";
import EventInfo from "./EventInfoComponent";
import CreateEventComponent from "./CreateEventComponent";
import ConflictActivities from "./ConflictActivitiesComponent";

const mapStateToProps = state => {
    return {
        accountData: state.accountData
    }
}

const mapDispatchToProps = dispatch => ({
    getAccountData: () => { dispatch(getAccountData())},
});

class Main extends Component{
    componentDidMount() {
        this.props.getAccountData()
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
                let event = {
                    id: eventAccount.event.id,
                    name: eventAccount.event.name,
                    description: eventAccount.event.description,
                }
                events.push(event)
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
                    <Route path='/invitations' element={<Invitation/>}/>
                    <Route path='/createEvent' element={<CreateEventComponent/>}/>
                    <Route path='/conflictActivities' element={<ConflictActivities/>}/>
                    <Route path="*" element={<Navigate to ="/home" />}/>
                </Routes>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)