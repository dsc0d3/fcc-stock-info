import React from 'react';

class About extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="h2">About</div>
        <br/>
        
        <div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="h3">API Sources</div>
              <div>
                This web app uses below listed data sources' api functionality - 
              </div>
            </div>
            <div className="panel-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="https://www.quandl.com/tools/api" target="_blank">Quandl's Financial Data API</a>
                </li>
              </ul>
            </div>
            <div className="panel-footer">&hearts; for all :)</div>
          </div>
        </div>
        
        <div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="h3">Application Configurations</div>
              <div>
                This web app follows below listed functionalities - 
              </div>
            </div>
            <div className="panel-body">
              <ul className="list-group">
                <li className="list-group-item">
                  NASDAQ or similar symbols are accepted, as those are accepted by the API service.
                </li>
                <li className="list-group-item">
                  The Live Update feature for added symbols by any user of the application checks for updates of symbol addition once in every 30 seconds, while standby.
                </li>
                <li className="list-group-item">
                  To reduce server load the live update feature stops requesting server data after 5 minutes.
                </li>
              </ul>
            </div>
            <div className="panel-footer">&hearts; for all :)</div>
          </div>
        </div>
        
        <div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="h3">Libraries</div>
              <div>
                Along with several amazing open-source node modules, this web application uses below listed modules - 
              </div>
            </div>
            <div className="panel-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="https://github.com/facebook/react" target="_blank">ReactJS</a>
                </li>
                <li className="list-group-item">
                  <a href="https://github.com/rackt/react-router" target="_blank">React Router</a>
                </li>
                <li className="list-group-item">
                  <a href="https://github.com/strongloop/express" target="_blank">ExpressJS</a>
                </li>
                <li className="list-group-item">
                  <a href="https://github.com/kirjs/react-highcharts" target="_blank">React Highcharts</a>
                </li>
                <li className="list-group-item">
                  etc... :)
                </li>
              </ul>
            </div>
            <div className="panel-footer">&hearts; for all :)</div>
          </div>
        </div>
        
        <div>
          <div className="panel panel-default">
            <div className="panel-heading">
              <div className="h3">Developer</div>
              <div>
                Abu Md. Maruf Sarker
              </div>
            </div>
            <div className="panel-body">
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="https://github.com/MarufSarker" target="_blank">Github [MarufSarker]</a>
                </li>
                <li className="list-group-item">
                  <a href="https://twitter.com/iMaruf" target="_blank">Twitter [@iMaruf]</a>
                </li>
                <li className="list-group-item">
                  <a href="http://www.freecodecamp.com/MarufSarker" target="_blank">FreeCodeCamp [marufsarker]</a>
                </li>
              </ul>
            </div>
            <div className="panel-footer">&hearts;  :)</div>
          </div>
        </div>
        
      </div>
    );
  }
}

export default About;