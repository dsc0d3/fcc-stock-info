import { Router } from 'express';
import Request    from 'request';
import _          from 'lodash';

import {
  QuandlAPIKey,
} from '../../providerAPI/providerAPI';

let router = Router();

let RequestedQueries = [];
let ResultedQueryData = {};
let LatestEntry = '';
let TimeDifference = 3000000;
let anotherData = {};

function handleLaterData() {
  let newObj = {};
  Object.keys(ResultedQueryData).map(key => {
    let dataObj = ResultedQueryData[key].data;
    dataObj.map(item => {
      newObj[item.Date] = newObj[item.Date] || {};
      newObj[item.Date][key] = item.Close;
    });
  });
  let allKeys = Object.keys(ResultedQueryData);
  Object.keys(newObj).map(key => {
    allKeys.map(k => {
      newObj[key][k] = newObj[key][k] || 0;
    });
  });
  return newObj;
}

router.post('/api/updatecheck', (req, res) => {
  res.json({lastUpdate: LatestEntry});
});

router.post('/api/removequery', (req, res) => {
  if (req.body.remove) {
    let toRemove = req.body.remove.toUpperCase();
    let idx = RequestedQueries.indexOf(toRemove);
    RequestedQueries.splice(idx, 1);
    ResultedQueryData = _.omit(ResultedQueryData, toRemove);
    anotherData = handleLaterData();
    LatestEntry = Date.now();
    res.json({data: anotherData, lastUpdate: LatestEntry, queries: RequestedQueries});
  } else {
    res.json({data: anotherData, lastUpdate: LatestEntry, queries: RequestedQueries});
  }
});

router.post('/api/tradereport', function(req, res) {
  function intR (i) {
    return new Promise((resolve, reject) => {
      Request("https://www.quandl.com/api/v3/datasets/WIKI/" + i + ".json?api_key=" + QuandlAPIKey + "&limit=365", function(err, response, body) {
        if (!err && response.statusCode == 200) {
          resolve(body);
        } else {
          resolve(err)
        }
      });
    })
  }
  function latestUpdateFinder(allQueries) {
    let tmpArr = [];
    tmpArr = allQueries.filter(query => {
      query = query.toUpperCase();
      return ResultedQueryData[query] ? ResultedQueryData[query].lastUpdated <= (Date.now() - TimeDifference) : true;
    });
    // console.log(tmpArr);
    return tmpArr;
  }
  if (req.body.query || (RequestedQueries.length !== 0)) {
    if (req.body.query) {
      if (!RequestedQueries.some(d => d === req.body.query)) {
        RequestedQueries.push(req.body.query);
      }
    }
    let tmpQueries = latestUpdateFinder(RequestedQueries);
    if (tmpQueries.length === 0) {
      res.json({data: anotherData, lastUpdate: LatestEntry, queries: RequestedQueries});
    }
    // console.log(RequestedQueries);
    Promise.all(tmpQueries.map(qr => intR(qr))).then(data => {
      // console.log(!!data);
      data = data.map(datum => {
        if (datum !== null) {
          return JSON.parse(datum)
        } else {
          return null;
        }
      });
      data = data.filter(function(value) {
        return value !== null;
      });
      data ? data.map(datum => {
        if (datum.dataset) {
          datum = datum.dataset;
          let dataObj = {};
          dataObj.lastUpdated = Date.now();
          dataObj.dataset_code = datum.dataset_code;
          dataObj.name = datum.name;
          dataObj.data = datum.data.map(key => {
            return {
              Date: new Date(key[0]).valueOf(),
              Close: key[4]
            }
          });
          ResultedQueryData[dataObj.dataset_code] = dataObj;
          LatestEntry = Date.now();
        }
      }) : null;
      // 
      anotherData = handleLaterData();
      // console.log(RequestedQueries);
      RequestedQueries = Object.keys(ResultedQueryData);
      // console.log(RequestedQueries);
      res.json({data: anotherData, lastUpdate: LatestEntry, queries: RequestedQueries});
    });
  } else {
    res.json({error: "Please add a query"});
  }
});


export default router;
