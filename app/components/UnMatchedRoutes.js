import React    from 'react';
import { Link } from 'react-router';

class UnMatchedRoutes extends React.Component {
  render() {
    return (
      <div className="container">
        Sorry !
        <br/>
        <Link to={`/${this.props.params.splat}`}>.../{this.props.params.splat}</Link> is not found!
        <br/>
        Please Goto <Link to="/">Home Page</Link>
      </div>
    );
  }
}

export default UnMatchedRoutes;