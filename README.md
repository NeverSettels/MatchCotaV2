# MatchCota
### A match making app for people lookig for a new Pet and pets looking for a Home. 
### _By Eric Settels.  2020_

## Description
This app will provide a space for people looking for a new pet to match with people giving up pets for adoption. 

## Developers Note:
**It is important to note that pet adoption is not something to do on a whim. It is a responsability you're agreeing to for the rest of the pets life. You will be their safety and calm in this world and if you are unable or unwilling to to accept this responsibility DO NOT ADOPT. Animals are living beings act accordingly**


### _**[Responsibe Pet Adoption](https://www.petmd.com/dog/care/ultimate-guide-responsible-pet-adoption)**_




## User Stories
|Component|Story|
|:---:|:---|
| User Accounts | Users should be able to sign up for an account, sign in and sign out.
| Pets/Home | Depending On role user should be able to either add multiple pets or 1 home|
| Matching | Users Should be able to like oposite role pet or home and see match |
| Photo uploads | Users should be able to upload photos for their pets and home|


### Stretch Goals

|Component|Story|
|:---:|:---|
| Location | Users only sees profiles in area |
| User Profiles | Users can update a profile |
| Filters | Users can filter pets and home by desired info |
| E-Mail Notification | Users can recieve email notifications when matched |
| Messages | Users can send/recive emails with matched user |


## MVP
* User registration (database storage)
* User login/sign-out (with database authentication)
* User can add Pet/Home with images 
* User can Like Pet/Home and match if liked back
* User can browse pets/homes


## Strech Goals
* user can contact matches in app
* account verification
* only show pets/homes in area
* filter by relevant fields
* resources tab with usefull info for new/old pet owners

  
## Component Diagram / Wireframe

![Component Map](/wireframe_v1.png)
## Installation instructions

<details>
<summary><strong>Setup/Installation Requirements</strong></summary>

#### Node install
If you do not already have it installed please find a guide for your operating system here
[Installing Node.js](https://nodejs.org/en/download/)


Clone the project by typing this command into your terminal.
```sh
git clone https://github.com/NeverSettels/matchcota.git
```
Navigate to the new project folder by typing:
```sh
cd matchcota
```
Install all required packages with this command:
```sh
npm install
```

Create an new file named '.env'
```sh
touch .env
```

Sign up for an account with Google Firebase and start a project. For more details follow this getting started guide. 
[Getting started with Google Firebase](https://firebase.google.com/docs/storage/web/start)

Please this into your new .env file. Fill in these details with the API keys you got from Google Firebase.
```sh
REACT_APP_FIREBASE_API_KEY = "provided by google firebase"

REACT_APP_FIREBASE_AUTH_DOMAIN = "provided by google firebase"

REACT_APP_FIREBASE_DATABASE_URL = "provided by google firebase"

REACT_APP_FIREBASE_PROJECT_ID = "provided by google firebase"

REACT_APP_FIREBASE_STORAGE_BUCKET = "provided by google firebase"

REACT_APP_FIREBASE_MESSAGING_SENDER_ID = "provided by google firebase"

REACT_APP_FIREBASE_APP_ID = "provided by google firebase"

```

In the project directory, you can run: 

 This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
</details>

## Known bugs
* None Yet

## Support 

_The software is provided as is. It might work as expected - or not. Use at your own risk._


## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) 
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) 
* [React](https://reactjs.org/)
* [Antd](https://ant.design/) - Used for styling
* [React-Router](https://reacttraining.com/react-router/)
* [React-Redux](https://react-redux.js.org/)
* [React-Redux-Firebase](http://react-redux-firebase.com/docs/getting_started)
* [Firebase](firebase.google.com)
* [Firebase Auth](https://firebase.google.com/docs/auth)
* [FireStore](https://firebase.google.com/docs/firestore/?gclid=CjwKCAjw7-P1BRA2EiwAXoPWA3JGLAS3VwXY2zaUzOp9A9HT48EkVZ2W-4zNy2RIbzTwlxH2ujiiTxoCWVUQAvD_BwE)
* [Node.js](https://nodejs.org/en/)




### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

Copyright (c) 2020 **_Eric Settels_**



