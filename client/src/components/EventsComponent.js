import {Component} from "react";
import {Button, Card, CardText, CardTitle} from "reactstrap";
import {Loading} from "./LoadingComponent";

const RenderEvent = ({id, title, description}) => {
    return(
        <div className="col-12 col-md-4">
            <Card body className="text-center mt-3 mt-md-5">
                <CardTitle tag="h5">
                    {title}
                </CardTitle>
                <CardText>
                    {description}
                </CardText>
                <Button>
                    Перейти
                </Button>
            </Card>
        </div>
    )
}

class Events extends Component{

    renderAllEvents = () => {
        if (this.props.isLoading){
            return(
                <div className="mt-5">
                    <Loading loadingObject={"мероприятий"}/>
                </div>
            )
        }
        else if (this.props.errMess){
            return(
                <div className="mt-5">
                    <h3>Произошла ошибка: {this.props.errMess}</h3>
                </div>
            )
        }
        else if (this.props.events.length === 0){
            return(
                <div className="mt-5">
                    <h3>Нет мероприятий</h3>
                </div>
            )
        }
        else {
            const events = this.props.events.map((event) => {
                return (
                    <RenderEvent key={event.id} title={event.name} description={event.description}/>
                )
            })
            return events
        }
    }

    render() {
        return(
            <div className="container">
                <div className="row">
                    {this.renderAllEvents()}
                </div>
            </div>
        )
    }
}

export default Events