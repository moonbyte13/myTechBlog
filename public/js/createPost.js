// Function to create a new post
const newPostHandler = async (event) => {
  event.preventDefault();
  // Collect values from the new post form
  const title = document.querySelector('#newGoalTitle').value.trim();
  const postContent = document.querySelector('#newGoalContent').value.trim();
  const url = document.querySelector('#newGoalLink').value.trim() || null;
  // If the title and postContent are not empty, create a new post
  if (title && postContent) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/posts/post', {
      method: 'POST',
      body: JSON.stringify({ title, postContent, url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // If the response is ok, redirect to the dashboard and alert the user that the post was created
    if (response.ok) {
      document.location.replace('/dashboard');
      alert('Post created!');
    } else {
      alert('Failed to create post');
    }
  }
};

// querySelector for the new post form and add an event listener for the submit event
document
  .querySelector('.newPostForm')
  .addEventListener('submit', newPostHandler);