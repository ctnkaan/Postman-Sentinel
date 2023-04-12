<p align="center">
	<img src="./assets/Sentinel.png" width=540px height=540px>
	<h1 align="center"> Postman Sentinel </h1>
		<p align="center">
			<b>This is the main repository of the Postman Sentinel Discord Bot. </b> 
		</p>  
</p>

## About :

Postman Sentinel is a Discord Bot developed by Çetin Kaan Taşkıngenç & Claire Froelich. It's main aims are to help make the Postman Student Community Discord a better place by using moderation and fun commands !

## Note to all developers

Be sure to not commit directly to the main. Happy coding !

## Prerequisites

### System requirement

1. Any system with basic configuration.
2. Operating System : Windows / Linux / Mac

### Software requirement

1. Node.JS
2. Git

(Docker is nice but not required to run the project locally)

### Skill requirement

1. Git & Github
2. Node.JS
3. Discord.JS
4. TypeScript

## Running the Project Locally

### Setting Up The Application

1. Clone the project with `git clone` and `cd` into it
1. Copy the env vars: `cp .sampledotenv .env`
1. Get your secret key from [Discord Developer Portal](https://discord.com/developers/applications) (make a bot for your app) and put it in the `.env` file as the value for `DISCORD_TOKEN`
1. Run `yarn install`
1. You are good to go! Now you can start the project by typing `yarn dev`

## Commands

#### Active Commands

-   `!p translate <text>` -> Translate a message from another language to English
-   `!p help`-> Displays all commands
-   `!p programs` -> List all programs
-   `!p meme` -> Send a coding meme from Reddit
-   `!p security` -> Display the current number of attacks blocked
-   `!p project` -> Display a random project idea
-   `!p pets` -> Display a cute cat picture

#### Silent Commands

-   `Scam Detection` -> Every message is scanned for scams
-   `Non Gender Netural Words Detection` -> Every message is scanned for words like 'guys', 'dude', 'bro', etc..

## Contributors :

<a  href  =  "https://github.com/ctnkaan/postman-student-helper/graphs/contributors">

<img  src  =  "https://contrib.rocks/image?repo=ctnkaan/postman-student-helper"/>

</a>
