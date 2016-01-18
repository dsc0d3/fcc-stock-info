const post = (url, body) => fetch(url, {
  method      : 'POST',
  credentials : 'include',
  body        : JSON.stringify(body || {}),
  headers     : {
    'Content-Type' : 'application/json',
    'Accept'       : 'application/json'
  }
}).then(res => res.json());

export const postQuery = (query) => post('/api/tradereport', { query });
export const removeQuery = (remove) => post('/api/removequery', { remove });
export const updateCheck = () => post('/api/updatecheck');
