import os
import requests
import json
import sys

BASE_DIRECTORY = os.path.abspath(os.path.join(os.getcwd(), os.pardir, os.pardir))
QUESTION_FILE = "content-auditor-prompt.txt"
OUTPUT_FILE = "auditor-responses.md"
FOUND_FILES = "auditor-found-files.txt"
API_URL = sys.argv[1]
# Ollama typically uses http://localhost:11434/api/generate

with open(QUESTION_FILE, 'r') as f:
    QUESTION = f.read().strip()

with open(OUTPUT_FILE, 'w') as f:
    f.write("## Responses:\n")
    
with open(FOUND_FILES, 'w') as f:
    f.write("## Found MDX files:\n")

FOUND_FILES
with open(FOUND_FILES, 'w') as f:
    for root, dirs, files in os.walk(BASE_DIRECTORY):
        for file in files:
            if file.endswith(".mdx"):
                file_path = os.path.join(root, file)
                f.write(file_path + "\n")

with open(FOUND_FILES, 'r') as f:
    files = f.readlines()

for file_path in files:
    file_path = file_path.strip()
    if os.path.isfile(file_path):
        print(f"Processing file: {os.path.basename(file_path)}")
        
        with open(file_path, 'r') as f:
            CONTENT = f.read()
        
	#Modify the below variable to match the intended HTTP request body, if not running Ollama with llama3.1
        data = {
            "model": "llama3.1",
            "prompt": f"{QUESTION} {CONTENT}",
            "stream": False
        }

        response = requests.post(API_URL, json=data)
        response_json = response.json()
        RESPONSE = response_json["response"]

        if RESPONSE.startswith(("No", "no")):
            with open(OUTPUT_FILE, 'a') as f:
                f.write(f"**File**: {file_path} – clean\n")
                f.write("___\n")
        else:
            with open(OUTPUT_FILE, 'a') as f:
                f.write(f"**File**: {file_path}\n")
                f.write(f"**Response**: {RESPONSE}\n")
                f.write("___\n")

print(f"All responses have been saved to {OUTPUT_FILE}")

