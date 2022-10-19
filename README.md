## MySQL Employee Tracker

A command-line application for managing a workforce's database.

!["The user demos the application"](./DemoGif.gif)

GitHub Repository: [https://github.com/BrettMiller47/sql-employee-tracker](https://github.com/BrettMiller47/sql-employee-tracker)

## Installation

Download the code from the GitHub repository and run `npm i` in the terminal. Configure the .env file with the appropriate information then run `mysql -u root -p` and enter your password from the .env file. Run `source ./db/schema.sql`, then run `quit`. Run `npm run seed` then `npm start` to initialize the application.
