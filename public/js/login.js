// Function to handle the login form
const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const email = document.querySelector('#emailLogin').value.trim();
  const password = document.querySelector('#passwordLogin').value.trim();
  // If the email and password are not empty, send a POST request to the API endpoint
  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email: email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If the response is ok, redirect to the dashboard and alert the user that they have logged in
    if (response.ok) {
      // alert('You have successfully logged in!');
      document.location.replace('/dashboard');
    } else {
      alert('Failed to log in.');
    }
  }
};

// Function to handle the signup form
const signupFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the signup form
  const username = document.querySelector('#usernameSignup').value.trim();
  const email = document.querySelector('#emailSignup').value.trim();
  const password = document.querySelector('#passwordSignup').value.trim();
  // If the username, email, and password are not empty, send a POST request to the API endpoint
  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If the response is ok, redirect to the homepage and alert the user that they have signed up
    if (response.ok) {
      alert('You have successfully signed up!');
      document.location.replace('/');
    } else {
      alert('Failed to sign up.');
    }
  }
};

// querySelector for the login and signup forms and add event listeners for the submit events
document
  .querySelector('.loginForm')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signupForm')
  .addEventListener('submit', signupFormHandler);
