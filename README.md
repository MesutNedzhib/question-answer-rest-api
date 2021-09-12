# Question? - Answer! 
The Question - Answer is a REST Api, created similar to stackoverflow, like idea, where users can ask any questions and write answers.

## How to run 
1. Download.
2. Open the folder in the CLI and install all dependencies using command `npm install`.
3. Go to open and edit **config.env** file in the **config/env** directory.
4. Run in the CLI, command `npm run import` - for the upload in advance generated users, questions and answers collections in your database.
5. Finally run the command `npm start` to get started.

## How to test
1. Download and install Postman.
2. Open the Postman and on the top select **File -> Import -> Folder -> Choose folder from your computer** and select **postman-data** directory from the question-answer folder. 
3. Start testing. 

## Features
- Authorization
  - Register 
  - Login 
  - Logout 
  - Forgot password
  - Reset password
  - Get a profile 
  - Image upload to profile
  - Edit details a profile
 
- User
  - Get all users
  - Get single user

- Admin
  - Block a user
  - Delete a user

- Questions
  - Create a new question
  - Get all questions
  - Get single question 
  - Edit 
  - Delete 
  - Like 
  - Undo like 

- Answers
  - Create a new answer
  - Get all answers
  - Get single answer 
  - Edit 
  - Delete 
  - Like 
  - Undo like 


