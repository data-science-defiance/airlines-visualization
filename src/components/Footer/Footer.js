import React from "react";
import { Container } from "reactstrap";

class FooterPage extends React.Component {
    render() {
        return (
            <div className="text-center" style={{ marginTop: '1em'}}>
                <Container fluid className="text-white bg-info">
                    <br></br>
                    <br></br>
                    <h3>Jobs fills your pocket. Adventures in paradise fills your soul.</h3>
                    <br></br>
                    <br></br>
                </Container>
                <Container fluid className="text-black bg-white">
                    <br></br>
                    &copy; {new Date().getFullYear()} Copyright:{" "}
                    <a href="https://github.com/data-science-defiance/airlines-visualization" className="text-black" style={{ textDecoration: "underline"}}>
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