import React from 'react';

import Header from './Header';
import Footer from './Footer';
import ChartComponent from './ChartComponent';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header 
          location={this.props.location}/>
        {
          this.props.children
        }
        <Footer/>
      </div>
    );
  }
}

export default App;