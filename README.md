# workshop-spec-kit
Code and sample app for my workshop about SDD with Spec Kit

## Prerequisites
- IDE of your choice
- AI Agent of your choice (e.g., GitHub Copilot, ChatGPT, etc.). This workshop uses IntelliJ IDEA with GitHub Copilot.

## Code in this project
The code in this project was generated using Spec Kit and GitHub Copilot. It follows the Tutorial vides availeble at https://www.youtube.com/watch?v=a9eR1xsfvHg.

For each step of the Spec Kit SDLC a separate commit was made so you can follow along and see how the code evolved during the process.

## Getting Started for your own project
1. Clone this repository to your local machine.
2. Visit the [Spec Kit Repository](https://github.com/github/spec-kit) and follow the instructions to install the Specify CLI (optional but recommended). Alternatively, you can download the Spec Kit templates for a combination of AI Agent and CLI language as a Zip file and extract it to your local machine.

## Prompt/command log
The following prompts and/or commands were used to generate the code in this repository using GitHub Copilot.

### Step 0: Initialize project using Specify
Specify is a CLI tool that basically does nothing but provide a nice console dialog to download the right templates for your combination of AI Agent and programming language and makes them executable. I used the persistent installation and initialized this repository using the following command:

```shell
specify init --here --ai copilot --script sh
```

This creates the following folders and files:
```text
./
├─ .github/                 # Directory containing GitHub Copilot specific configuration files (this directory will be named differently for other AI Agents)
│  ├─ agents/               # AI agent instructions for each step of the Spec Kit SDLC on how to handle the user input
│  ├─ prompts/              # Prompts for each step of the Spec Kit SDLC. The files are needed so the AI Agent can reference them during generation.
├─ .specify/                # Directory containing Specify related configuration files
│  ├─ memory/               # Memory files for each step of the Spec Kit SDLC to help the AI Agent remember previous steps
│  │  ├─ constitution.md    # Spec Kit a blank template for a constitution file defining the principles and guidelines for the AI Agent during the SDLC
│  ├─ scripts/              # Directory containing shell scripts to automate the Spec Kit SDLC steps
│  │  ├─ bash/              # Bash scripts for each step of the Spec Kit SDLC
│  ├─ templates/            # Directory containing templates for each step of the Spec Kit SDLC
```

### Step 1: Define Constitution
I used the following prompt to generate the constitution for this project:

```
/speckit.constitution Fill the constitution with the bare minimum requirements for a static web app based on the template
```

This prompte did the following:
- Filled the blank constitution template file at `./specify/memory/constitution.md` with meaningful content for a static web app project
- Changed `./speecify/templates/plan-template.md` to reference the constitution check