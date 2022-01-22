import {Component} from "react";
import Calendar from 'react-calendar'
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

class EventManager extends Component{



    render() {
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12 mt-3 mt-md-5">
                        <Calendar
                            className="w-100"
                            formatMonthYear={(locale, date) => {
                                return date.toLocaleString(locale, { month: 'long', year: 'numeric'}).slice(0, -3);
                            }}
                        />
                    </div>
                    <div className="col-12 mt-2 mt-md-3 mb-5">
                        <Link to={'/createEvent'}>
                            <Button color="primary w-100">
                                Создать мероприятие
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default EventManager;