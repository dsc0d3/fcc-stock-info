import React           from 'react';
import ReactDOM        from 'react-dom';
import _               from 'lodash';
import ReactHighcharts from 'react-highcharts/dist/bundle/highcharts';

import {postQuery, removeQuery, updateCheck} from '../api/api';

const refreshInterval = 30000;
const stoppingInterval = 5 * 60 * 1000;

class ChartComponent extends React.Component {
  state = {
    queries    : [],
    errorEntry : '',
    data       : {}, 
    lastUpdate : '',
    labels     : [],
    datasets   : [],
    update     : {},
  };
  componentWillMount() {
    postQuery().then(data => {
      this.handleUpdate(data);
    });
  };
  componentDidMount() {
    this.setState({
      update: setInterval(() => {
        updateCheck().then(data => {
          // console.log(data)
          if (data.lastUpdate !== this.state.lastUpdate) {
            postQuery().then(data => {
              this.handleUpdate(data);
            });
          }
        });
      }, refreshInterval)
    });
    this.updateStop();
    ReactDOM.findDOMNode(this.refs.queryInput).focus();
  };
  componentWillUnmount() {
    clearInterval(this.state.update)
  };
  updateStop = () => {
    setTimeout(() => {
      clearInterval(this.state.update)
    }, stoppingInterval);
  };
  handleUpdate = (data) => {
    if (data.queries) {
      this.setState({
        data       : data.data, 
        lastUpdate : data.lastUpdate, 
        queries    : data.queries
      });
      this.handleData();
      return;
    } else {
      this.setState({
        labels: ["January", "February", "March", "April", "May", "June", "July"], 
        datasets: [
          {
            name: "My First dataset",
            data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
            name: "My Second dataset",
            data: [28, 48, 40, 19, 86, 27, 90]
          }
        ],
        errorEntry: "No Query has been added. Please add at-least one NASDAQ or similar symbol."
      });
      return;
    }
  };
  handleQueryPost = (evt) => {
    evt.preventDefault();
    let queryInput = ReactDOM.findDOMNode(this.refs.queryInput).value;
    if (queryInput.length !== 0) {
      ReactDOM.findDOMNode(this.refs.queryInput).value = '';
      this.setState({
        errorEntry : '', 
        data       : {}, 
        lastUpdate : '', 
        labels     : [], 
        datasets   : []
      });
      postQuery(queryInput).then(data => {
        this.setState({
          data       : data.data, 
          lastUpdate : data.lastUpdate, 
          queries    : data.queries
        });
        this.handleData();
      });
    } else {
      this.setState({
        errorEntry: "Please Enter Any NASDAQ or Similar Symbols, i.e., 'GOOG', 'MSFT', 'FB', etc."
      });
    }
  };
  handleRemove = (q) => {
    removeQuery(q).then(data => {
      this.handleUpdate(data);
    });
  };
  sortOBJ = (obj, comparator) => {
    let keys = _.sortBy(_.keys(obj), (key) => {
      return comparator ? comparator(obj[key], key) : key;
    });
    let returningData = _.zipObject(keys, _.map(keys, (key) => {
      return obj[key];
    }));
    return returningData
  };
  handleData = () => {
    let tempLabels = [];
    let tempData   = {};
    let dataHolder = this.state.data;
    dataHolder     = this.sortOBJ(dataHolder);
    Object.keys(dataHolder).map(t => {
      tempLabels.push(parseInt(t));
      let tempDatum = dataHolder[t];
      Object.keys(tempDatum).map(nm => {
        tempData[nm]      = tempData[nm] || {};
        tempData[nm].data = tempData[nm].data || [];
        tempData[nm].data.push(tempDatum[nm]);
        tempData[nm].name = nm;
      });
    });
    tempLabels.map((t, i) => {
      tempLabels[i] = new Date(t).toString().slice(4, 15);
    });
    let pseudoFinalData = [];
    Object.keys(tempData).map(entry => pseudoFinalData.push(tempData[entry]));
    this.setState({
      labels: tempLabels, 
      datasets: pseudoFinalData
    });
  };
  config = () => {
    return {
      title: {
        text : 'Stock Price History',
        x    : -20 //center 
      },
      subtitle: {
        text : 'Source: Quandl.com',
        x    : -20
      },
      xAxis: {
        categories: this.state.labels
      },
      yAxis: {
        title: {
          text: 'Price ($)'
        },
        plotLines: [{
          value : 0,
          width : 1,
          color : '#808080'
        }]
      },
      tooltip: {
        valueSuffix: '$'
      },
      legend: {
        layout        : 'vertical',
        align         : 'right',
        verticalAlign : 'middle',
        borderWidth   : 0
      },
      series: this.state.datasets,
      chart: {
        zoomType: 'x'
      },
    };
  };
  queryShow = (q) => {
    return (
      <div className="btn btn-primary">{q}</div>
    );
  };
  render() {
    return (
      <div className="container">
        <ReactHighcharts config={this.config()} ref="chart"></ReactHighcharts>
        <div className="container text-center">
          {
            this.state.queries ? 
              this.state.queries.map(q => {
                return (
                  <div 
                    className="btn btn-primary" 
                    key={q}
                    title={q}
                    style={{margin: '5px', cursor: 'default'}}>
                    {q}
                    <div
                      className="btn"
                      title={"Remove " + q}
                      onClick={this.handleRemove.bind(this, q)}
                      style={{margin: "auto -3px auto 2px", padding: "3px" }}>
                      X
                    </div>
                  </div>
                )
              }) 
            : null
          }
        </div>
        <form className="form-inline text-center">
          <div className="form-group">
            <input
              type="text" 
              title="Enter NASDAQ or similar symbols, otherwise won't be accepted"
              placeholder="NASDAQ, similar symbol"
              className="form-control" 
              ref="queryInput"/>
          </div>
          <button
            type="submit" 
            className="btn btn-info" 
            onClick={this.handleQueryPost}>
            Add Query
          </button>
        </form>
        <div className="noSymbol text-center">
          <em>{this.state.errorEntry}</em>
        </div>
      </div>
    );
  }
}

export default ChartComponent;