import React               from 'react';
import { Link, IndexLink } from 'react-router';

class Header extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object
  };
  routeIsActive = (pathname, query) => {
    return this.props.location.pathname === pathname;
  };
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">StockInfo</a>
          </div>

          
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li
                className={this.routeIsActive('/') ? 'active' : ''}>
                <IndexLink to="/">
                  Home
                  <span className="sr-only">(current)</span>
                </IndexLink>
              </li>
              <li
                className={this.routeIsActive('/about') ? 'active' : ''}>
                <Link to="about">About</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}


export default Header;