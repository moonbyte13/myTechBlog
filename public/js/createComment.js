// Function to create a new comment
const newCommentHandler = async (event) => {
  event.preventDefault();
  // Collect values from the new post form
  const commentText = document.querySelector('#newCommentText').value.trim();
  const postId = document.querySelector('#createCommentBtn').getAttribute('data-value');
  if (postId && commentText) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/comments/comment', {
      method: 'POST',
      body: JSON.stringify({ commentText, postId }),
    });
    // If the response is ok, redirect to the dashboard and alert the user that the post was created
    if (response.ok) {
      document.location.replace('/dashboard');
      alert('Comment created!');
    } else {
      alert('Failed to create post');
    }
  }
};

// querySelector for the new comment form and add an event listener for the submit event
document
  .querySelector('.newCommentForm')
  .addEventListener('submit', newCommentHandler);