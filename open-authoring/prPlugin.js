import React from "react"
import Cookies from "js-cookie"
const { createPR, fetchExistingPR } = require("./github/api/index");
const baseBranch = process.env.BASE_BRANCH

export class PRPlugin {
    constructor(baseRepoFullName, forkRepoFullName, accessToken) {
        this.__type = "screen";
        this.name = "Create Pull Request";
        this.Icon = () => <>🚀</>;
        this.layout = "popup";
        this.state = {
        responseMessage: "",
        fetchedPR: null
        };

        const getHeadBranch = () => {
            return Cookies.get('head_branch') || "master"
        }

        this.titleInput = React.createRef()
        this.bodyInput = React.createRef()

        this.checkForPR = () => {
        fetchExistingPR(baseRepoFullName, forkRepoFullName, getHeadBranch(), accessToken).then( pull => {
            if (pull) {
            this.state.fetchedPR = pull;
            this.name = "Existing Pull Request";
            } else {
            this.state.fetchedPR = { id: null };
            }
        })
        }

        this.checkForPR()
        

        this.createPR = () => {
        createPR(baseRepoFullName, forkRepoFullName, getHeadBranch(), accessToken, this.titleInput.current.value, this.bodyInput.current.value)
            .then(response => {
            alert(`you made a PR!: ${response.data.html_url}`);
            this.checkForPR()
            })
            .catch(err => {
            alert(
                `PR failed (Has a PR already been created?): ${JSON.stringify(err)}`
            );
            });
        };

        this.Component = () => {

        return (
            <div style={{ padding: "10px" }}>
            { !this.state.fetchedPR.id &&
                <div>
                <a
                target="_blank"
                href={`https://github.com/${baseRepoFullName}/compare/${baseBranch}...${
                    forkRepoFullName.split("/")[0]
                    }:${getHeadBranch()}`}
                >
                See Changes
                </a>
                <p>
                This will create a PR from:
                <br />
                <b>
                    {forkRepoFullName} - {getHeadBranch()}
                </b>{" "}
                <br />
                into <br />
                <b>
                    {baseRepoFullName} - {baseBranch}
                </b>
                </p>
                <div>
                <label>
                    Title: 
                    <input type="text" ref={this.titleInput} placeholder="Pull Request Title"></input>
                </label>
                <br />
                <br />
                <label>
                    Body: 
                    <textarea ref={this.bodyInput} style={{resize: "none"}} rows="6" placeholder="Pull Request Message Body" />
                </label>

                </div>

                <button onClick={this.createPR}>Create PR</button>
    
                <div>{this.state.responseMessage}</div>
                </div>
            }
            { this.state.fetchedPR.id && 
                <div>
                <a
                target="_blank"
                    href={`https://github.com/${baseRepoFullName}/compare/${baseBranch}...${
                    forkRepoFullName.split("/")[0]
                    }:${getHeadBranch()}`}
                >
                    See Changes
                </a>
                <p>
                    A Pull request already exists.
                </p>
                </div>
            }
            { !this.state.fetchedPR &&
                <div>
                Loading...
                </div>
            }
            </div>
        )
        };
    }

    handleTitleInputChange(event) {
        this.state.userSetPRTitle = event.target.value
    }

    handleBodyInputChange(event) {
        this.state.userSetPRBody = event.target.value
    }
}