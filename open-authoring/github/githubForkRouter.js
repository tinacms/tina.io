const express = require("express");
const qs = require("qs");
const axios = require("axios");
const path = require("path");
const { createFork } = require("./api");

const GITHUB_FORK_COOKIE_KEY = "tina-github-fork-name";
const GITHUB_FORK_COOKIE_EXP = "tina-github-fork-exp"
const NO_COOKIES_ERROR = `@tinacms/teams \`authenticate\` middleware could not find cookies on the request.

Try adding the \`cookie-parser\` middleware to your express app.

https://github.com/expressjs/cookie-parser
`;

function githubForkRouter() {
  const router = express.Router();

  router.get("/github/fork", async (req, res) => {
    createFork(process.env.REPO_FULL_NAME, req.cookies["tina-github-auth"])
      .then(forkResp => {
        const { full_name } = qs.parse(forkResp.data);
        const timestamp = Date.now().toString();      
        res.cookie(GITHUB_FORK_COOKIE_EXP, timestamp)
        res.cookie(GITHUB_FORK_COOKIE_KEY, full_name);
        res.redirect(`/`);
      })
      .catch(e => {
        console.error(e);
      });
  });

  const validateFork = (forkURL) => {
    return axios({
      method: 'GET',
      url: `https://api.github.com/repos/${forkURL}`
    }).then( response => {
      if (response.data.full_name === forkURL) {
        return true;
      }
      return false;
    }).catch( err => {
      console.log(err);
      return false;
    })
    
  }

  function showForkRequest(res) {
    const unauthorizedView = path.join(__dirname, "/request-fork.html");
    res.sendFile(unauthorizedView);
  }

  function requestForking(req, res, next) {
    
    if (!req.cookies) {
      throw new Error(NO_COOKIES_ERROR);
    }
    const forkUrl = req.cookies[GITHUB_FORK_COOKIE_KEY];
    const forkExp = req.cookies[GITHUB_FORK_COOKIE_EXP]

    if (!forkUrl || !forkExp) {
      showForkRequest(res);
      return;
    }

    const currTime = Date.now();
  
    if (currTime - parseInt(forkExp) < 30 * 1000) { // less than 10 seconds since validation
      next();
      return;
    }

    validateFork(forkUrl).then( isValid => {
      if (isValid) {
        res.cookie(GITHUB_FORK_COOKIE_EXP, currTime.toString());
        next();
        return;
      }
      showForkRequest(res);
    });
  }

  router.use(requestForking);

  return router;
}

module.exports = githubForkRouter;
