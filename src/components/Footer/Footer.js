import React from "react";
import { Container } from "reactstrap";

class FooterPage extends React.Component {
    render() {
        return (
            <div className="text-center">
                <Container fluid className="text-white bg-warning">
                    <br></br>
                    <br></br>
                    <h3>A job fills your pocket. Adventure in paradise fills your soul.</h3>
                    <br></br>
                    <br></br>
                </Container>
                <Container fluid className="text-white bg-primary">
                    <br></br>
                    &copy; {new Date().getFullYear()} Copyright:{" "}
                    <a href="https://github.com/data-science-defiance/airlines-visualization" className="text-white" style={{ textDecoration: "underline"}}>
                        Airline Visualization 
                    </a>
                    <br></br>
                    <br></br>
                </Container>
            </div>
        );
    }
}

export default FooterPage;