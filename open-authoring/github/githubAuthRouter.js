const express = require("express");
const axios = require("axios");
const qs = require("qs");
const { createAccessToken } = require("./api");

const GITHUB_AUTH_COOKIE_KEY = "tina-github-auth";
const GITHUB_AUTH_COOKIE_EXP = "tina-github-exp"

const NO_COOKIES_ERROR = `@tinacms/teams \`authenticate\` middleware could not find cookies on the request.

Try adding the \`cookie-parser\` middleware to your express app.

https://github.com/expressjs/cookie-parser
`;

function checkForAuthToken(req, res, next) {
  
  if (!req.cookies) {
    throw new Error(NO_COOKIES_ERROR);
  }
  const token = req.cookies[GITHUB_AUTH_COOKIE_KEY];
  const timestamp = req.cookies[GITHUB_AUTH_COOKIE_EXP];

  if (!token) { // no token, redirect to github authorize to get one
    githubLoginRedirect(res)
    return;
  }

  const currTime = Date.now();
  
  if (currTime - parseInt(timestamp) < 30 * 1000) { // less than 10 seconds since verification
    next();
    return;
  }
  

  axios({
    method: 'GET',
    url: 'https://api.github.com/user',
    headers: {
      Authorization: 'token ' + token,
      Accept: 'application/vnd.github.machine-man-preview+json',
    },
  }).then(response => {    
    if (response.status === 200) { // call using token succeeded ergo valid token     
      // reset token experation timestamp 
      res.cookie(GITHUB_AUTH_COOKIE_EXP, currTime.toString())
      next();
      return;
    } else {
      githubLoginRedirect(res)
      return;
    }
  }).catch( err => {    
    githubLoginRedirect(res)
    return;
  })
}

function githubLoginRedirect(res) {
  res.redirect(
    `https://github.com/login/oauth/authorize?${qs.stringify({
      scope: "public_repo",
      client_id: process.env.GITHUB_CLIENT_ID
    })}`
  );
}

function githubAuthRouter() {
  const router = express.Router();

  router.get("/github/authorized", async (req, res) => {
    createAccessToken(
      process.env.GITHUB_CLIENT_ID,
      process.env.GITHUB_CLIENT_SECRET,
      req.query.code
    ).then(tokenResp => {
      const { access_token } = qs.parse(tokenResp.data);
      const timestamp = Date.now().toString();      
      res.cookie(GITHUB_AUTH_COOKIE_EXP, timestamp)
      res.cookie(GITHUB_AUTH_COOKIE_KEY, access_token);
      res.redirect(`/`);
    });
  });

  router.use(checkForAuthToken);

  return router;
}
module.exports = githubAuthRouter;
