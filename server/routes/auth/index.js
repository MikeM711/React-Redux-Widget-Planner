const express = require('express');
const passport = require('passport');
// user's widget calculation history model

const router = express.Router();

router.get('/auth/google', passport.authenticate('google', {
  scope:['profile']
}));

// 12.8 Callback route for Google to redirect to
/* 12.8 The below router is responsible for handling the URL that '/auth/google' router has redirected us to (declared by passport.js - Google Strategy - 'callbackURL')
  Without the below router, after we sign in, we get the message: "Cannot GET /auth/google/callback" 
  If we say: (req,res) => {res.send('hello world')}, as the callback, we land on a page with a URL such as:
      "http://localhost:5000/auth/google/callback?code=4%2FEAEhMLeFaUUwvntvtfdmm...""
      This is a code that google is sending to us, we “Receive user details from provider (Google)”
      We can access this code, and passsport can use this code to then grab the information that we want
*/

/* 12.9 This router will facilitate the exchange of code (in the URL) for profile information, before we enter the "Passport callback function" inside passport.js
  We use passport.authenticate('google'), as an extra piece of middleware in this route
      This same callback was used inside the '/auth/google' router, what's the difference?
          Ans: The difference is, when execution reaches the callback, we have a code in the URL. Passport can see that we have that code!
          Passport sees the code and it knows that the execution has ALREADY BEEN to the Consent Screen!
      Execution goes straight to google and says: 
          "I have this code, this user said we can authenticate them using their Google profile. 
          So I’m here with my code, to get their profile information.” 
      So [Google] grabs that profile information and comes back.
          Before we enter our {redirects} - Google comes back with the profile information, the callback function is fired!
      [EXECUTION ENTERS THE PASSPORT CALLBACK FUNCTION inside passport.js]
  Redirects:
      If we enter all done() methods with a defined 2nd param, we will end up with 'successRedirect'
      If at any point execution enters a done() method with a defined 1st param, we immediately receive a blank screen with the 1st param displayed, on the URL that the execution was on
      If we enter done() with a true/defined 3rd param in Verify Callback Function, we end up with 'failureRedirect'
*/

/* UNCOMMENT BELOW LINE - For simple authentication on the backend*/

// router.get( '/auth/google/callback', passport.authenticate( 'google', { 
//       successRedirect: '/dashboard',
//       failureRedirect: '/auth/google/failure'
// }));

router.get("/auth/google/callback", passport.authenticate( "google", { 
  failureRedirect: "/", session: false }),
  function(req, res) {
      var token = req.user.token;
      res.redirect("http://localhost:3000?token=" + token);
  }
);

// If something goes wrong (failureRedirect - entering a done() with a defined 3rd param in the Verify Callback Function), we will be redirected to this URL
router.get('/auth/google/failure', (req,res) => {
  res.send('Authentication failure')
})

// We want app/routes/index.js to have access to our routes inside this file when it uses require()
module.exports = router;