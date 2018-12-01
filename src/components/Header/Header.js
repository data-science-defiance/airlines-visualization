import React from 'react';
import {
  Navbar,
  NavbarBrand } from 'reactstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div >
        <Navbar color="light" light expand="md" style={{justifyContent: 'center', fontFamily: 'georgia', fontWeight: 'bold'}}>
            <NavbarBrand href="/">Airlines Visualization (Hawaii to Domestic U.S.)</NavbarBrand>
        </Navbar>
      </div>
    );
  }
}

export default Header;