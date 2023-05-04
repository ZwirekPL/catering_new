# Catering Manager Frontend

This is the frontend part of the Catering Manager application created in React.js.
Auth0 is responsible for user authorization.
It uses the Axios library to query the server.
React Router is used for website routing.
Swpier.js is used in the History Shopping List and Storage History tabs

## Installation
Download and install [node.js](https://nodejs.org/en) in v18 or lastest
Use the npm package manager [npm](https://www.npmjs.com/) to install dependencies for Catering Manager Frontend.
Clone this repository. Open in terminal this repository and install any dependencies.
```bash
npm install
```
To run Catering Frontend Manager you need to have an Auth0 account and create and implement Auth0 solutions for Catering Manager Fronend
Auth0 -> applications -> Create application -> Single Page Web Applications.

Create an .env file in the frontend folder and type (replacing with your data)
```bash
REACT_APP_AUTH0_DOMAIN= Domain from Auth0
REACT_APP_AUTH0_CLIENT_ID= Client ID from Auth0
REACT_APP_AUTH0_CALLBACK_URL= Callback url your site
REACT_APP_API_SERVER_URL= url of Your server
REACT_APP_AUTH0_AUDIENCE= audience from Auth0
```


## Usage

Once the dependencies are installed, type in the terminal:
```bash
npm start
```
to run Catering Manager Frontend 


## License

[MIT](https://choosealicense.com/licenses/mit/)
