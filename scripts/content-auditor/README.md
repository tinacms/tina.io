# Content Auditor

## Description

The Tina documentation is exhaustive. To make maintenance and spotting issues easy, we've created this script that runs a LLM prompt against every .mdx file it can find.

Local automation was chosen as external LLM providers charge for API usage.
This AI audit script can be run on your own machine – for free.

## System Set-up

1. Install a local LLM.
*We recommend Ollama with Llama3.1. See https://ollama.com/ for installation details.*

2. Install Python3. Check that pip and venv (python3-venv) are installed.

3. Create a virtual environment with `python3 -m venv {{environment name}}` in this directory. 
Active the virtual environment above with `{{environment name}}\Scripts\activate` on Windows, or `source {{environment name}}/bin/activate` on Mac. 
Install the `requests` package with pip.

## Running the Script

1. Ensure the LLM server is running, and note the URL needed to make requests to it.
*`ollama serve` is the command for this if using ollama, with URL http://localhost:11434/api/generate*

2. Customise the prompt by changing the `content-auditor-prompt.txt` file in this directory with the question to ask about each file.
*We recommend asking a yes or no question, and ending the prompt with "Start your response with Yes or No."*

3. If not using Ollama, update the `data` variable (`content-auditor.py:42`) to match the desired API payload for the LLM server.

4. Active the python virtual environment as above.

5. Run the script with `python3 content-auditor.py {{API URL from step 1}}`

6. Grab a coffee or switch tabs while the LLM reads the docs 🤖☕️.