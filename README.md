# Angular Emailer App API

## About
This is the API needed to run the frontend angular emailer app from my repository located [here](https://github.com/kyledavis109/Angular-Emailer). Documentation is available there for getting setup and running the frontend of the app. You must have this API up and running before you can launch the frontend of the app.

### Installation

1. To get started you will need to install Node.JS on your computer. [Node.JS Download](https://nodejs.org/en/download/).

2. Next you will need to install Git to pull the code from my Github repository. [Git Download](https://git-scm.com/downloads).

3. You will also need to have a GitHub account as well as a SSH Key. [SSH Key Tutorial](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).

4. Once you have installed everything and are setup, you are ready to clone the repository. To clone the repository, open up a terminal and run `git clone https://github.com/kyledavis109/Angular-Emailer-API` to clone the repository into a folder on your computer.

5. This app was created using outlook.com for emailing. For information on using preferred email service, usage and setup to use the nodemailer npm package visit [Nodemailer](https://nodemailer.com/message/).

6. A `.env` file to store environmental variables for the API is required. These variables will be sensitive information so it's best to not share them with anyone. Store `.env` file in a `.gitignore` file if pushing to repository. Create a `.env` file in the root directory of this file and store the environmental variables as follows:

```

PORT=

```

7. Pick a PORT number and assign it to `PORT=` as an environmental variable.

8.  You will need a few npm packages installed to run this app. To install the packages, in the terminal navigate to the root folder of the repository and then run `npm i`.

***Congratulations! You've completed installation!*** 

#### To Start API
To run the API, run the command `nodemon app` to start the API. You are now ready to run the frontend of the application!

### Support
If you need any help along the way getting this app started, please contact me by email at kyledavis109@gmail.com.