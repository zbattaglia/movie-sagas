import React, { Component } from 'react';
import '../Header/Header.css';

class Header extends Component {

  date() {
    let tempDate = new Date();
    let date = ( tempDate.getMonth() + 1 ) + '/' + tempDate.getDate() + '/' + tempDate.getFullYear();
    return <><h1 className='Header'>Now Playing<br />{date}</h1></>
  }

  render() {
    return (
      <>
        {this.date()}
      </>
    );
  }
}

export default Header;