import React from 'react';
import {
  Navbar,
  NavbarBrand } from 'reactstrap';

class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="white" expand="md" style={{justifyContent: 'center', fontWeight: 'bold'}}>
            <NavbarBrand href="/" className="text-dark">
              <h1>Trip to Paradise Visualization</h1>
            </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}

export default Header;