# Social-Network-C17
University of Richmond Bootcamp - Code Challenge 17 - Social Network API
Created By: Brad Webster in collaboration with edX Coding Bootcamp
## Description:
The Social Network API is a backend application built with Node.js, Express, and MongoDB, designed to simulate a social media platform's data functionality. The API allows users to create profiles, post thoughts, add reactions, and connect with friends. It includes full CRUD (Create, Read, Update, Delete) operations for users, thoughts, and friends. This project serves as a foundation for building social platforms applications, with functionality like friend connections, thought management, and reaction systems. The schema structure and API routes are flexible, allowing easy integration into full-stack applications with front-end frameworks like React.

## Table of Contents:
  * [Installation](#installation)
  * [Usage](#usage)
  * [License](#license)
  * [Credits](#credits)
## Installation: 
  For a live demo of this project, you can just find it here:
  https://vimeo.com/1017786264?share=copy
  <br/>The following steps will allow you to run the code locally:
  <br/>Step 1: Navigate to : https://github.com/bmw-dev0p/Social-Network-C17
  <br/>Step 2: Clone the repo to download it onto your local computer
  <br/>Step 3: Open download in the IDE of your choosing, navigate to the folder "src", right click, run in integrated terminal
  <br/>Step 4: Run the command ```npm run set-up``` to automatically install dependent packages, build, seed, and start program 
  <br/>Step 5: Navigate to https://localhost.3001 in Insomnia (or another API development software of your choosing)
  <br/>Step 6: Import the included .yaml file included in the assets folder to set up api routes
  <br/>Step 7: Enjoy the program by posting to the different api routes

## Usage:
  Insomnia software displaying the API get route for All Users
  <br/>![allUser](https://github.com/bmw-dev0p/Social-Network-C17/blob/main/src/assets/readme1.jpg?raw=true)
  <br/> Insomnia software displaying the API post route for adding a Friend to User
  <br/>![home](https://github.com/bmw-dev0p/Social-Network-C17/blob/main/src/assets/readme2.jpg?raw=true)
  <br/> Insomnia software displaying the API post route for adding a Reaction to Thought
  <br/>![home](https://github.com/bmw-dev0p/Social-Network-C17/blob/main/src/assets/readme3.jpg?raw=true)

## Features:
### Coding Language(s): 
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
<br/>Typescript
### Framework(s):
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) 
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
<br/>React, Node.js, NPM, Express, MongoDB
### Other Features: 
- User Management: 
  - Create, update, delete, and view user profiles. Each user can have a list of friends, stored with both ObjectID and username.
- Thoughts & Reactions:
  - Users can post, update, and delete their thoughts.
  - Thoughts can receive reactions from other users, with reactions being added or removed dynamically.
- Friends Management:
  - Users can add or remove friends by username or ID.
  - Upon adding a friend, if the username doesn't exist, a new user is automatically created.
- Cascading Deletion:
  - When a user is deleted, all of their associated thoughts are also removed from the database.

## License / Badges:
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) 
    
This project is licensed under the MIT license. Click the badge for more information.
## Credits:
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://github.com/bmw-dev0p)
Brad Webster's Github Portfolio
<br/>Created in collaboration with edX Coding Bootcamp
<br/>Github Badges - https://github.com/Ileriayo/markdown-badges
  


