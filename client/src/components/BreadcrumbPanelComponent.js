import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link} from "react-router-dom";

export const BreadcrumbPanel = ({location}) => {
    return(
        <div className="breadcrumb">
            <div className="container">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to={"/home"}>
                            Мои мероприятия
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {location}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>
        </div>
    )
}
