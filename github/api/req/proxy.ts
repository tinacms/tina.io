const axios = require('axios')

export default (req, res) => {
  const { headers, ...data } = JSON.parse(req.body)

  axios({
    ...data,
    headers: {
      ...headers,
      Authorization: 'token ' + req.cookies['github_access_token'],
    },
  })
    .then(resp => {
      res.status(resp.status).json(resp.data)
    })
    .catch(err => {
      res.status(err.response.status).json(err.response.data)
    })
}
