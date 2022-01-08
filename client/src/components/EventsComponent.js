import {Component} from "react";
import {Button, Card, CardText, CardTitle} from "reactstrap";

class Events extends Component{

    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <Card body className="text-center mt-3 mt-md-5">
                            <CardTitle tag="h5">
                                Мероприятие 1
                            </CardTitle>
                            <CardText>
                                Хорошее мероприятие, желаю всем посетить его
                            </CardText>
                            <Button>
                                Перейти
                            </Button>
                        </Card>
                    </div>
                    <div className="col-12 col-md-4">
                        <Card body className="text-center mt-3 mt-md-5">
                            <CardTitle tag="h5">
                                Мероприятие 2
                            </CardTitle>
                            <CardText>
                                Хорошее мероприятие, желаю всем посетить его
                            </CardText>
                            <Button>
                                Перейти
                            </Button>
                        </Card>
                    </div>
                    <div className="col-12 col-md-4">
                        <Card body className="text-center mt-3 mt-md-5">
                            <CardTitle tag="h5">
                                Мероприятие 3
                            </CardTitle>
                            <CardText>
                                Хорошее мероприятие, желаю всем посетить его
                            </CardText>
                            <Button>
                                Перейти
                            </Button>
                        </Card>
                    </div>
                    <div className="col-12 col-md-4">
                        <Card body className="text-center mt-3 mt-md-5">
                            <CardTitle tag="h5">
                                Мероприятие 4
                            </CardTitle>
                            <CardText>
                                Хорошее мероприятие, желаю всем посетить его
                            </CardText>
                            <Button>
                                Перейти
                            </Button>
                        </Card>
                    </div>
                    <div className="col-12 col-md-4">
                        <Card body className="text-center mt-3 mt-md-5">
                            <CardTitle tag="h5">
                                Мероприятие 5
                            </CardTitle>
                            <CardText>
                                Хорошее мероприятие, желаю всем посетить его
                            </CardText>
                            <Button>
                                Перейти
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Events