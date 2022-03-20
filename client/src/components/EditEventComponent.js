import React, {Component} from "react";
import {
    Breadcrumb,
    BreadcrumbItem,
    Button, Col,
    FormFeedback,
    Input, Modal, ModalBody, ModalHeader,
    Table
} from "reactstrap";
import {Link} from "react-router-dom";
import serverApi from "../api/serverApi";

const RenderActivity = ({deleteActivity,
                            handleActivityNameChanged,
                            handleActivityDescriptionChanged,
                            handleActivityStartChanged,
                            handleActivityFinishChanged,
                            errors,
                            activities,
                            touched,
                            handleActivityNameBlured,
                            handleActivityDescriptionBlured,
                            handleActivityStartBlured,
                            handleActivityFinishBlured}) => {
    let content = []
    for (let i=1; i<=activities.length; i++){
        content.push(
            <tr>
                <div className="row">
                    <th className="col-12 col-md-1">
                        {i}
                    </th>
                    <div className="col-12 col-md-4">
                        <Input onChange={handleActivityNameChanged(i)}
                               onBlur={handleActivityNameBlured(i)}
                               bsSize="sm"
                               type="textarea"
                               rows={2}
                               placeholder="Название"
                               value={activities[i-1].name}
                               invalid={errors.activities[i-1].name !== '' || (activities[i-1].name === '' && touched.activities[i-1].name)}
                        />
                        <FormFeedback>{errors.activities[i-1].name}</FormFeedback>
                    </div>
                    <div className="col-12 col-md-7 mt-3 mt-md-0">
                        <Input onChange={handleActivityDescriptionChanged(i)}
                               onBlur={handleActivityDescriptionBlured(i)}
                               bsSize="sm"
                               type="textarea"
                               rows={2}
                               placeholder="Описание"
                               value={activities[i-1].description}
                               invalid={errors.activities[i-1].description !== '' || (activities[i-1].description === '' && touched.activities[i-1].description)}
                        />
                        <FormFeedback>{errors.activities[i-1].description}</FormFeedback>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-4 offset-md-2 offset-xl-3">
                        <Input onChange={handleActivityStartChanged(i)}
                               onBlur={handleActivityStartBlured(i)}
                               bsSize="sm"
                               type="datetime-local"
                               min="0001-01-01T00:00"
                               max="2999-12-31T23:59"
                               value={activities[i-1].start}
                               invalid={errors.activities[i-1].start !== '' || ((activities[i-1].startDate === '' || activities[i-1].startTime === '') && touched.activities[i-1].start)}
                        />
                        <FormFeedback>{errors.activities[i-1].start}</FormFeedback>
                    </div>
                    <div className="col-12 col-md-4 mt-3 mt-md-0">
                        <Input onChange={handleActivityFinishChanged(i)}
                               onBlur={handleActivityFinishBlured(i)}
                               bsSize="sm"
                               type="datetime-local"
                               min="0001-01-01T00:00"
                               max="2999-12-31T23:59"
                               value={activities[i-1].finish}
                               invalid={errors.activities[i-1].finish !== '' || ((activities[i-1].finishDate === '' || activities[i-1].finishTime === '') && touched.activities[i-1].finish)}
                        />
                        <FormFeedback>{errors.activities[i-1].finish}</FormFeedback>
                    </div>
                    <div className="col-12 col-md-2 col-xl-1 mt-3 mt-md-0">
                        <Button onClick={(event) => {deleteActivity(event, i, activities[i-1].id)}} className="col-12 deleteButton"><span className="fa fa-trash fa-lg"></span></Button>
                    </div>
                </div>
            </tr>
        )
    }
    return content
}

class EditEvent extends Component{

    constructor(props) {
        super(props);

        this.eventId = this.getEventId()

        this.state = {
            eventData: JSON.parse(sessionStorage.getItem('editEventData')),
            isErrorWindowOpen: false,
            errorMessage: '',
            errors: {
                name: '',
                description: '',
                activities: []
            },
            changed: {
                name: false,
                description: false,
                activities: []
            },
            touched: {
                name: true,
                description: true,
                activities: []
            },
            activitiesToDelete: []

        }

        for (let i=0; i<this.state.eventData.activities.length; i++){
            this.state.changed.activities.push(false)
            this.state.errors.activities.push({
                name: '',
                description: '',
                start: '',
                finish: '',
            })
            this.state.touched.activities.push({
                name: true,
                description: true,
                start: true,
                finish: true,
            })
        }

        this.breadcumbEventName = this.state.eventData.name

        this.incrActivitiesCount = this.incrActivitiesCount.bind(this)
        this.decrActivitiesCount = this.decrActivitiesCount.bind(this)
        this.handleNameChanged = this.handleNameChanged.bind(this)
        this.handleDescriptionChanged = this.handleDescriptionChanged.bind(this)
        this.handleActivityNameChanged = this.handleActivityNameChanged.bind(this)
        this.handleActivityDescriptionChanged = this.handleActivityDescriptionChanged.bind(this)
        this.handleActivityStartChanged = this.handleActivityStartChanged.bind(this)
        this.handleActivityFinishChanged = this.handleActivityFinishChanged.bind(this)
        this.handleSaveButtonClicked = this.handleSaveButtonClicked.bind(this)
        this.handleNameBlured = this.handleNameBlured.bind(this)
        this.handleDescriptionBlured = this.handleDescriptionBlured.bind(this)
        this.handleActivityNameBlured = this.handleActivityNameBlured.bind(this)
        this.handleActivityDescriptionBlured = this.handleActivityDescriptionBlured.bind(this)
        this.handleActivityStartBlured = this.handleActivityStartBlured.bind(this)
        this.handleActivityFinishBlured = this.handleActivityFinishBlured.bind(this)
        this.toggleErrorWindow = this.toggleErrorWindow.bind(this)
    }

    getEventId(){
        const path = window.location.pathname
        const index = path.lastIndexOf('/')  + 1
        const eventId = path.slice(index, path.length)
        return eventId
    }

    incrActivitiesCount(){
        let eventData = this.state.eventData
        let errors = this.state.errors
        let touched = this.state.touched
        let changed = this.state.changed
        let activities = eventData.activities
        let errorsActivities = errors.activities
        let changedActivities = changed.activities
        let touchedActivities = touched.activities
        activities.push({
            name: "",
            description: "",
            start: "",
            finish: ""
        })
        errorsActivities.push({
            name: '',
            description: '',
            start: '',
            finish: '',
        })
        touchedActivities.push({
            name: false,
            description: false,
            start: false,
            finish: false,
        })
        changedActivities.push(true)
        eventData.activities = activities
        errors.activities = errorsActivities
        touched.activities = touchedActivities
        changed.activities = changedActivities
        this.setState({
            eventData: eventData,
            errors:errors,
            touched: touched,
            changed: changed
        })
    }

    toggleErrorWindow(){
        this.setState({isErrorWindowOpen: !this.state.isErrorWindowOpen})
    }

    decrActivitiesCount(event, index, id){
        let eventData = this.state.eventData
        let errors = this.state.errors
        let touched = this.state.touched
        let activities = eventData.activities
        let errorsActivities = errors.activities
        let changed = this.state.changed
        let changedActivities = changed.activities
        let touchedActivities = touched.activities
        let activitiesToDelete = this.state.activitiesToDelete
        activitiesToDelete.push(id)
        changedActivities.splice(index-1, 1)
        activities.splice(index-1, 1)
        errorsActivities.splice(index-1, 1)
        touchedActivities.splice(index-1, 1)
        eventData.activities = activities
        touched.activities = touchedActivities
        errors.activities = errorsActivities
        changed.activities = changedActivities
        this.setState({
            activitiesToDelete: activitiesToDelete,
            changed: changed,
            eventData: eventData,
            errors:errors,
            touched: touched})
    }

    handleNameChanged(event){
        let eventData = this.state.eventData
        eventData.name = event.target.value
        let changed = this.state.changed
        changed.name = true
        let errors = this.state.errors
        if (event.target.value.length > 0){
            errors.name = ''
        }
        if (event.target.value.length > 70){
            errors.name = 'Количество символов не должно превышать 70'
        }
        this.setState({
            changed: changed,
            eventData: eventData,
            errors: errors})
    }

    handleDescriptionChanged(event){
        let eventData = this.state.eventData
        eventData.description = event.target.value
        let changed = this.state.changed
        changed.description = true
        let errors = this.state.errors
        if (event.target.value.length > 0){
            errors.description = ''
        }
        if (event.target.value.length > 100){
            errors.description = 'Количество символов не должно превышать 100'
        }
        this.setState({
            changed: changed,
            eventData: eventData,
            errors: errors})
    }

    handleActivityNameChanged = (id) => (event) => {
        let eventData = this.state.eventData
        eventData.activities[id-1].name = event.target.value
        let changed = this.state.changed
        changed.activities[id-1] = true
        let errors = this.state.errors
        if (event.target.value.length > 0){
            errors.activities[id-1].name = ''
        }
        if (event.target.value.length > 70){
            errors.activities[id-1].name = 'Количество символов не должно превышать 70'
        }
        this.setState({
            eventData: eventData,
            errors: errors,
            changed: changed
        })
    }

    handleActivityDescriptionChanged = (id) => (event) => {
        let eventData = this.state.eventData
        eventData.activities[id-1].description = event.target.value
        let changed = this.state.changed
        changed.activities[id-1] = true
        let errors = this.state.errors
        if (event.target.value.length > 0){
            errors.activities[id-1].description = ''
        }
        if (event.target.value.length > 100){
            errors.activities[id-1].description = 'Количество символов не должно превышать 100'
        }
        this.setState({
            eventData: eventData,
            errors: errors,
            changed: changed
        })
    }

    handleActivityStartChanged = (id) => (event) => {
        const datetime = this.splitDateTime(event.target.value)
        let eventData = this.state.eventData
        eventData.activities[id-1].start = datetime.date + 'T' + datetime.time
        let changed = this.state.changed
        changed.activities[id-1] = true
        let errors = this.state.errors
        if (event.target.value !== ''){
            errors.activities[id-1].start = ''
        }
        this.setState({
            eventData: eventData,
            errors: errors,
            changed: changed
        })
    }

    handleActivityFinishChanged = (id) => (event) => {
        const datetime = this.splitDateTime(event.target.value)
        let eventData = this.state.eventData
        eventData.activities[id-1].finish = datetime.date + 'T' + datetime.time
        let changed = this.state.changed
        changed.activities[id-1] = true
        let errors = this.state.errors
        if (event.target.value !== ''){
            errors.activities[id-1].finish = ''
        }
        this.setState({
            eventData: eventData,
            errors: errors,
            changed: changed
        })
    }

    splitDateTime(datetime){
        let result = {}
        let index = datetime.indexOf('T')
        result.date = datetime.slice(0, index)
        result.time = datetime.slice(index+1)
        return result
    }

    getDataForConflictRequest(data){
        let activities = []
        data.forEach(activity => {
            const startDateAndTime = this.splitDateTime(activity.start)
            const finishDateAndTime = this.splitDateTime(activity.finish)
            activities.push({
                name: activity.name,
                description: activity.description,
                startDate: startDateAndTime.date,
                startTime: startDateAndTime.time,
                finishDate: finishDateAndTime.date,
                finishTime: finishDateAndTime.time
            })
        })
        return activities
    }

    handleSaveButtonClicked() {
        let errors = this.state.errors
        let touched = this.state.touched
        this.checkTouched(touched, errors)
        let isValid = this.checkErrors(errors)
        if (isValid) {
            const userId = localStorage.getItem('userId')
            const eventId = this.state.eventData.id
            const data = this.getDataForConflictRequest(this.state.eventData.activities)
            serverApi.getConflictActivitiesExceptEvent(userId, eventId, data).then(response => {
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
                .then(response => response.data)
                .then(response => {
                    if (response.length > 0) {
                        sessionStorage.setItem('editEventData', JSON.stringify(this.state.eventData))
                        sessionStorage.setItem('changedEventData', JSON.stringify(this.state.changed))
                        sessionStorage.setItem('editConflictActivities', JSON.stringify(response))
                        window.location = '/editConflictActivities'
                    }
                    else{
                        this.editEvent(userId)
                    }
                })
                .catch(error => {
                    this.setState({errorMessage: error.message})
                    this.toggleErrorWindow()
                })
        }
    }

    checkTouched(touched, errors){
        if (!touched.name){
            touched.name = true
            errors.name = 'Обязательное поле'
        }
        if (!touched.description){
            touched.description = true
            errors.description = 'Обязательное поле'
        }
        for (let i=0; i<touched.activities.length; i++){
            if (!touched.activities[i].name){
                touched.activities[i].name = true
                errors.activities[i].name = 'Обязательное поле'
            }
            if (!touched.activities[i].description){
                touched.activities[i].description = true
                errors.activities[i].description = 'Обязательное поле'
            }
            if (!touched.activities[i].start){
                touched.activities[i].start = true
                errors.activities[i].start = 'Обязательное поле'
            }
            if (!touched.activities[i].finish){
                touched.activities[i].finish = true
                errors.activities[i].finish = 'Обязательное поле'
            }
        }
        this.setState({touched: touched,
            errors: errors})
    }

    editEventData(accountId, data){
        serverApi.editEvent(accountId, this.eventId, data).then(response => {
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
            .catch(error => {
                this.setState({errorMessage: error.message})
                this.toggleErrorWindow()
            })
    }

    editActivity(accountId, activityId, data){
        serverApi.editActivity(accountId, this.eventId, activityId, data).then(response => {
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
            .catch(error => {
                this.setState({errorMessage: error.message})
                this.toggleErrorWindow()
            })
    }

    deleteActivity(accountId, activityId){
        serverApi.deleteActivity(accountId, this.eventId, activityId).then(response => {
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
            .catch(error => {
                this.setState({errorMessage: error.message})
                this.toggleErrorWindow()
            })
    }

    addActivities(data){
        serverApi.addActivities(this.eventId, data).then(response => {
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
            .catch(error => {
                this.setState({errorMessage: error.message})
                this.toggleErrorWindow()
            })
    }

    editEvent(accountId){
        let activitiesToAdd = []
        if (this.state.changed.name || this.state.changed.description){
            const data = {
                name: this.state.eventData.name,
                description: this.state.eventData.description
            }
            this.editEventData(accountId, data)
        }
        for (let i=0; i<this.state.changed.activities.length; i++){
            let activityId = this.state.eventData.activities[i].id
            if (this.state.changed.activities[i]){
                const activity = this.state.eventData.activities[i]
                const startDateAndTime = this.splitDateTime(activity.start)
                const finishDateAndTime = this.splitDateTime(activity.finish)
                const data = {
                    name: activity.name,
                    description: activity.description,
                    startDate: startDateAndTime.date,
                    startTime: startDateAndTime.time,
                    finishDate: finishDateAndTime.date,
                    finishTime: finishDateAndTime.time
                }
                if (activityId !== undefined) {
                    this.editActivity(accountId, activityId, data)
                }
                else {
                    activitiesToAdd.push(data)
                }
            }
        }
        this.state.activitiesToDelete.map(activityId => {
            this.deleteActivity(accountId, activityId)
        })
        if (activitiesToAdd.length > 0){
            this.addActivities(activitiesToAdd)
        }
        window.location = '/home'
    }

    checkErrors(errors){
        let isValid = true
        if (errors.name !== "" || errors.description !== "") {
            isValid = false
        }
        for (let i=0; i<errors.activities.length; i++) {
            if (errors.activities[i].name !== "" || errors.activities[i].description !== ""
                || errors.activities[i].start !== "" || errors.activities[i].finish !== "") {
                isValid = false
            }
        }
        return isValid
    }

    handleNameBlured(event){
        let touched = this.state.touched
        touched.name = true
        let errors = this.state.errors
        if (event.target.value === ''){
            errors.name = 'Обязательное поле'
        }
        this.setState({
            touched: touched,
            errors: errors
        })
    }

    handleDescriptionBlured(event){
        let touched = this.state.touched
        touched.description = true
        let errors = this.state.errors
        if (event.target.value === ''){
            errors.description = 'Обязательное поле'
        }
        this.setState({
            touched: touched,
            errors: errors
        })
    }

    handleActivityNameBlured = (id) => (event) => {
        let touched = this.state.touched
        touched.activities[id-1].name = true
        let errors = this.state.errors
        if (event.target.value === ''){
            errors.activities[id-1].name = 'Обязательное поле'
        }
        this.setState({
            touched: touched,
            errors: errors
        })
    }

    handleActivityDescriptionBlured = (id) => (event) => {
        let touched = this.state.touched
        touched.activities[id-1].description = true
        let errors = this.state.errors
        if (event.target.value === ''){
            errors.activities[id-1].description = 'Обязательное поле'
        }
        this.setState({
            touched: touched,
            errors: errors
        })
    }

    handleActivityStartBlured = (id) => (event) => {
        let touched = this.state.touched
        touched.activities[id-1].start = true
        let errors = this.state.errors
        if (event.target.value === ''){
            errors.activities[id-1].start = 'Обязательное поле'
        }
        this.setState({
            touched: touched,
            errors: errors
        })
    }

    handleActivityFinishBlured = (id) => (event) => {
        let touched = this.state.touched
        touched.activities[id-1].finish = true
        let errors = this.state.errors
        if (event.target.value === ''){
            errors.activities[id-1].finish = 'Обязательное поле'
        }
        this.setState({
            touched: touched,
            errors: errors
        })
    }

    render() {
        return(
            <div>
                <div className="breadcrumb">
                    <div className="container">
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <Link to={"/home"}>
                                    Мои мероприятия
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem>
                                <Link to={`/event/${this.state.eventData.id}`}>
                                    {this.breadcumbEventName}
                                </Link>
                            </BreadcrumbItem>
                            <BreadcrumbItem active>
                                Редактирование мероприятия
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                </div>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-12 col-lg-4">
                            <Input onChange={this.handleNameChanged}
                                   onBlur={this.handleNameBlured}
                                   type="textarea"
                                   rows={2}
                                   placeholder="Название мероприятия"
                                   value={this.state.eventData.name}
                                   invalid={this.state.errors.name !== '' || (this.state.eventData.name === '' && this.state.touched.name)}
                            />
                            <FormFeedback>{this.state.errors.name}</FormFeedback>
                            <Input className="mt-3"
                                   onChange={this.handleDescriptionChanged}
                                   onBlur={this.handleDescriptionBlured}
                                   type="textarea"
                                   rows={3}
                                   placeholder="Описание мероприятия"
                                   value={this.state.eventData.description}
                                   invalid={this.state.errors.description !== '' || (this.state.eventData.description === '' && this.state.touched.description)}
                            />
                            <FormFeedback>{this.state.errors.description}</FormFeedback>
                            <div className="col-12  d-none d-lg-flex">
                                <Button onClick={this.handleSaveButtonClicked} className="col-8 offset-2 mt-3">Сохранить</Button>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8 mb-5">
                            <h4 className="offset-1 mt-3 mt-lg-0">События:</h4>
                            <Table hover>
                                <thead>
                                </thead>
                                <tbody>
                                <RenderActivity
                                    deleteActivity={this.decrActivitiesCount}
                                    handleActivityNameChanged={this.handleActivityNameChanged}
                                    handleActivityDescriptionChanged={this.handleActivityDescriptionChanged}
                                    handleActivityStartChanged={this.handleActivityStartChanged}
                                    handleActivityFinishChanged={this.handleActivityFinishChanged}
                                    errors={this.state.errors}
                                    activities={this.state.eventData.activities}
                                    touched={this.state.touched}
                                    handleActivityNameBlured={this.handleActivityNameBlured}
                                    handleActivityDescriptionBlured={this.handleActivityDescriptionBlured}
                                    handleActivityStartBlured={this.handleActivityStartBlured}
                                    handleActivityFinishBlured={this.handleActivityFinishBlured}
                                />
                                </tbody>
                            </Table>
                            <div className="col-12 mt-5">
                                <Button onClick={this.incrActivitiesCount} className="col-12 col-md-4 offset-0 offset-md-4">Добавить событие</Button>
                            </div>
                            <div className="col-12 d-lg-none">
                                <Button onClick={this.handleSaveButtonClicked} className="col-6 offset-3 mt-5">Сохранить</Button>
                            </div>
                        </div>
                    </div>
                </div>
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

export default EditEvent