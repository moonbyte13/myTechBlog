// Function to handle the logout button
const logout = async () => {
  // Send a POST request to the API endpoint
  const response = await fetch('/api/users/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  // If the response is ok, redirect to the homepage
  if (response.ok) {
    document.location.replace('/');
  } else {
    alert(response.statusText);
  }
};

// querySelector for the logout button and add an event listener for the click event
document.querySelector('#logout').addEventListener('click', logout);
