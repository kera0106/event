import React, {Component, Fragment} from "react";
import {BreadcrumbPanel} from "./BreadcrumbPanelComponent";
import {Button, Input, Table} from "reactstrap";


const RenderActivity = ({activitiesCount,
                            deleteActivity,
                            handleActivityNameChanged,
                        handleActivityDescriptionChanged,
                        handleActivityStartChanged,
                        handleActivityFinishChanged,
                        invalidFields}) => {
    let content = []
    for (let i=1; i<=activitiesCount; i++){
        content.push(
           <tr>
               <div className="row">
                   <th className="col-12 col-md-1">
                       {i}
                   </th>
                    <div className="col-12 col-md-4">
                        <Input  className={invalidFields[i-1].name} onBlur={handleActivityNameChanged(i)} bsSize="sm" type="textarea" rows={2} placeholder="Название"/>
                    </div>
                   <div className="col-12 col-md-7 mt-3 mt-md-0">
                       <Input className={invalidFields[i-1].description} onBlur={handleActivityDescriptionChanged(i)} bsSize="sm" type="textarea" rows={2} placeholder="Описание"/>
                   </div>
               </div>
               <div className="row">
                   <div className="col-12 col-md-4 offset-md-2 offset-xl-3">
                       <Input className={invalidFields[i-1].start} onBlur={handleActivityStartChanged(i)} bsSize="sm" type="datetime-local"/>
                   </div>
                   <div className="col-12 col-md-4 mt-3 mt-md-0">
                       <Input className={invalidFields[i-1].finish} onBlur={handleActivityFinishChanged(i)} bsSize="sm" type="datetime-local"/>
                   </div>
                   <div className="col-12 col-md-2 col-xl-1 mt-3 mt-md-0">
                       <Button onClick={deleteActivity} className="col-12 deleteButton"><span className="fa fa-trash fa-lg"></span></Button>
                   </div>
               </div>
           </tr>
        )
    }
    return content
}

class CreateEvent extends Component{
    constructor(props) {
        super(props);

        this.state = {
            activitiesCount: 3,
            eventData: {
                name: '',
                description: '',
                activities: []
            },
            invalidFields: {
                name: '',
                description: '',
                activities: []
            }
        }

        this.incrActivitiesCount = this.incrActivitiesCount.bind(this)
        this.decrActivitiesCount = this.decrActivitiesCount.bind(this)
        this.handleNameChanged = this.handleNameChanged.bind(this)
        this.handleDescriptionChanged = this.handleDescriptionChanged.bind(this)
        this.handleActivityNameChanged = this.handleActivityNameChanged.bind(this)
        this.handleActivityDescriptionChanged = this.handleActivityDescriptionChanged.bind(this)
        this.handleActivityStartChanged = this.handleActivityStartChanged.bind(this)
        this.handleActivityFinishChanged = this.handleActivityFinishChanged.bind(this)
        this.saveEvent = this.saveEvent.bind(this)
    }

    componentWillMount() {
        let eventData = this.state.eventData
        let invalidFields = this.state.invalidFields
        let activities = []
        let invalidActivities = []
        for (let i=0; i<this.state.activitiesCount; i++){
            activities.push({
                name: "",
                description: "",
                startDate: "",
                startTime: "",
                finishDate: "",
                finishTime: ""
            })
            invalidActivities.push({
                name: '',
                description: '',
                start: '',
                finish: '',
            })
        }
        eventData.activities = activities
        invalidFields.activities = invalidActivities
        this.setState({eventData: eventData,
                            invalidFields: invalidFields})
    }

    incrActivitiesCount(){
        this.setState({activitiesCount: this.state.activitiesCount + 1})
    }

    decrActivitiesCount(){
        this.setState({activitiesCount: this.state.activitiesCount - 1})
    }

    handleNameChanged(event){
        let eventData = this.state.eventData
        eventData.name = event.target.value
        this.setState({eventData: eventData})
    }

    handleDescriptionChanged(event){
        let eventData = this.state.eventData
        eventData.description = event.target.value
        this.setState({eventData: eventData})
    }

    handleActivityNameChanged = (id) => (event) => {
        let eventData = this.state.eventData
        eventData.activities[id-1].name = event.target.value
        this.setState({eventData: eventData})
    }

    handleActivityDescriptionChanged = (id) => (event) => {
        let eventData = this.state.eventData
        eventData.activities[id-1].description = event.target.value
        this.setState({eventData: eventData})
    }

    handleActivityStartChanged = (id) => (event) => {
        const datetime = this.splitDateTime(event.target.value)
        let eventData = this.state.eventData
        eventData.activities[id-1].startDate = datetime.date
        eventData.activities[id-1].startTime = datetime.time
        this.setState({eventData: eventData})
    }

    handleActivityFinishChanged = (id) => (event) => {
        console.log("sdvsdv")
        const datetime = this.splitDateTime(event.target.value)
        let eventData = this.state.eventData
        eventData.activities[id-1].finishDate = datetime.date
        eventData.activities[id-1].finishTime = datetime.time
        this.setState({eventData: eventData})
    }

    splitDateTime(datetime){
        let result = {}
        let index = datetime.indexOf('T')
        result.date = datetime.slice(0, index)
        result.time = datetime.slice(index+1)
        return result
    }

    saveEvent(){
        const eventData = this.state.eventData
        let invalidFields = this.state.invalidFields
        let isValid = true
        if (eventData.name === ''){
            invalidFields.name = 'border-danger'
            isValid = false
        }
        if (!isValid){
            this.setState({invalidFields: invalidFields})
        }
    }

    render() {
        console.log(this.state.eventData)
        return(
            <div>
                <BreadcrumbPanel location={'Новое мероприятие'}/>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <h3>
                                <Input className={this.state.invalidFields.name} onBlur={this.handleNameChanged} type="textarea"  rows={2} placeholder="Название мероприятия"/>
                            </h3>
                            <Input className={this.state.invalidFields.description} onBlur={this.handleDescriptionChanged} type="textarea" rows={3} placeholder="Описание мероприятия"/>
                            <div className="col-12  d-none d-lg-flex">
                                <Button onClick={this.saveEvent} className="col-8 offset-2 mt-3">Сохранить</Button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 mb-5">
                            <h4 className="offset-1 mt-3 mt-lg-0">События:</h4>
                            <Table hover>
                                <thead>
                                </thead>
                                <tbody>
                                    <RenderActivity
                                        activitiesCount={this.state.activitiesCount}
                                        deleteActivity={this.decrActivitiesCount}
                                        handleActivityNameChanged={this.handleActivityNameChanged}
                                        handleActivityDescriptionChanged={this.handleActivityDescriptionChanged}
                                        handleActivityStartChanged={this.handleActivityStartChanged}
                                        handleActivityFinishChanged={this.handleActivityFinishChanged}
                                        invalidFields={this.state.invalidFields.activities}
                                    />
                                </tbody>
                            </Table>
                            <div className="col-12 mt-5">
                                <Button onClick={this.incrActivitiesCount} className="col-12 col-md-4 offset-0 offset-md-4">Добавить событие</Button>
                            </div>
                            <div className="col-12 d-lg-none">
                                <Button onClick={this.saveEvent} className="col-6 offset-3 mt-5">Сохранить</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateEvent