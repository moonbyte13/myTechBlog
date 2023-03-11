// JS for the 404 page
const goBackBtn = document.querySelector('.button-49');

// Function to go back to the previous page
const goBack = (e) => {
  e.preventDefault();

  // Built-in browser interface that allows changing the browser session history, or in this case to go back.
  history.back();
};

// Event listener for the go back button
goBackBtn.addEventListener('click', goBack);
