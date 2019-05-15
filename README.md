# React-Redux-Widget-Calculator
A full stack CRUD widget/authentication application, built with React.js, Redux, Node.js, Express.js, Sequelize.js, PostgreSQL and Passport.js.

This application is a demo of what I use for work, which replaces my old [WB Door Calculator](https://github.com/MikeM711/WB-Door-Calculator) and [SF Cabinet Calculator](https://github.com/MikeM711/SF-Cabinet-Calculator) angular.js applications.  

Check out the application here: https://widget-calculator.herokuapp.com/

## About ##

### Authentication ###

This full stack application can only be accessed when a user is authenticated.  A user can authenticate either locally (all passwords will be hashed) or by using their own Google account. If a user leaves the application, and comes back within 24 hours, the user will remain logged in. The main application is protected by a JWT passport strategy, making data more secure from unauthenticated users. 

### Create/Update/Delete Widgets ###

All authenticated users have the ability to create, update and delete Widgets in the "Database" route of the application. The name and values that the user provides will instantly be accessible in the dropdown menu in the "Widget Calculator" navigation route, and visible for every user.

### Widget Material Calculator ###

All dropdown menu items reflect the Widget Database.

To calculate how much material is needed to fulfill a job of Widgets, select your desired Widget and the quantity of that Widget. When complete, click the "Calculate" button. Repeat the process for all Widgets you wish to calculate.

You may view the Widget material data by clicking the "blue collapsible bar". You may also delete the selected Widget from your calculation by clicking the "X" button beside it.

### Saving Calculations to your Profile ###

Once you have finished estimating the material needed to fulfill a job of Widgets, you may click the "Submit Results To Profile" button. This action will save your calculation to your personal profile.  All users have their own personal profile, which is only visible to the respective user. You may save as many calculations to your profile as you wish, and delete them if you choose.

### Checking for Profile Synchronicity with the Widget Database ###

One issue regarding these saved calculations is that the Widgets in the Widget Database may be updated or deleted at a time after a calculation has been saved to a user's profile.  

**Example:** User #1 has a calculation involving "Widget A" saved on their profile. At a later date, User #1, or even User #2, may edit "Widget A" in the database with an updated material estimate.  Therefore, User #1's calculation involving "Widget A" is now deprecated.

**Solution:** Beneath all calculations, a "sync check" is displayed to notify the user whether their calculation is or is not synced to the Widget Database.  If not synced, the check will display what Widgets are considered "Old Versions" (edited Widgets) or "Not Found" (deleted Widgets). 

## Development ##

**Sequelize Config**

Inside the `server/config` directory, modify the following parameters inside `config.json`, to connect to your local development database.

```
{
  "development": {
      "username": <your-db-username>,
      "password": <your-db-password>,
      "database": "widget_calculator",
      "host": "127.0.0.1",
      "dialect": <your-db-dialect>,
      "logging": false
  },
  "test": {
      "username": "",
      "password": null,
      "database": "",
      "host": "",
      "dialect": <your-db-dialect>
  },
  "production": {
      "use_env_variable": "DATABASE_URL",
      "username": "",
      "password": null,
      "database": "",
      "host": "127.0.0.1",
      "dialect": <your-db-dialect>
  }
}
```

**Google Authentication**

Create a new project inside [Google Console Developers](https://console.developers.google.com/) to receive your Google `clientID` and `clientSecret`

If running locally, your `Authorized JavaScript origins` should be set to `http://localhost:3000` 

**Application Keys**

Inside the `server/config` directory, create a `keys.js` file, and add the following:

```
module.exports = {
  google: {
    clientID: <your-google-client-id>,
    clientSecret: <your-google-client-secret>
  },
  JWT_SECRET: "yourjwtsecret",
  ALLOWED_ORIGINS: "http://localhost:3000"
}
```

**Environment Variables**

Server: Create a `.env` file inside the `root` directory, and add the following variables to pass into the application's server environment.

```
GOOGLE_CLIENT_KEY=<your-google-client-key>
GOOGLE_SECRET_KEY=<your-google-secret-key>
JWT_SECRET=<your-JWT-secret>
ALLOWED_ORIGINS=<app-host-url>
```

Client: Create a `.env` file inside the `/client` directory, and add the following variables to pass into the application's client environment.

```
REACT_APP_GOOGLE_CLIENT_KEY=<your-google-client-key>
```

#### Run the Application

1. Run `npm install` in `root` to install server dependencies.
2. Navigate to `/client` and run `npm install` to install client dependencies.
2. Create local DB `widget_calculator`.
3. Run `npm run start-dev` to start the application.
4. Navigate to `http://localhost:3000`.

## Special Thanks ##

A shout-out to [react-collapsible](https://github.com/glennflanagan/react-collapsible) for their neat Collapsible component, highly recommended.
