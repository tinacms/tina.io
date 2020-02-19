const axios = require('axios')

/*
  ...
  body: {
    proxy_data: {
      ...proxy data
    }
  }
*/
export default (req, res) => {
  const { proxy_data } = JSON.parse(req.body)
  axios({
    ...proxy_data,
    headers: {
      ...proxy_data.headers,
      Authorization: 'token ' + req.cookies['github_access_token'],
    },
  }).then(resp => {
    res.status(resp.status).json(resp.data)
  }).catch(err => {
    res.status(err.response.status).json(err.response.data)
  })
}
