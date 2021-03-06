var loggedIn = false;
var userID = null;
// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
// get user info
const email = signupForm['signup-email'].value;
const password = signupForm['signup-password'].value;

// sign up the user
  
firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
// close the signup modal & reset form
	const modal = document.querySelector('#modal-signup');
	M.Modal.getInstance(modal).close();
	signupForm.reset();
    
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  firebase.auth().signOut().then(() => {
    console.log('user signed out');
    loggedIn = false;

  })
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  firebase.auth().signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
    userID = email;
    console.log(userID)
    loggedIn = true;

  });
});


