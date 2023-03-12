// Function to handle the edit post form
const editCommentHandler = async (event) => {
  event.preventDefault();
  // Collect values from the edit post form
  const commentText = document.querySelector('#editCommentText').value.trim();
  const commentId = document.querySelector('#editCommentBtn').getAttribute('data-value-comment');
  const postId = document.querySelector('#commentEditBtnPost').getAttribute('data-value-post');
  if (postId && commentId && commentText) {
    // Send a POST request to the API endpoint
    const response = await fetch(`/api/comments/comment/${ commentId }`, {
      method: 'PUT',
      body: JSON.stringify({ commentText, postId }),
      headers: { 'Content-Type': 'application/json' },
    });
    // If the response is ok, redirect to the dashboard and alert the user that the post was updated
    if (response.ok) {
      document.location.replace(`/details/${ postId }`);
      alert('Comment updated!');
    } else {
      alert('Failed to update Comment');
    }
  }
};

// querySelector for the edit post form and add an event listener for the submit event
document
  .querySelector('.editCommentForm')
  .addEventListener('submit', editCommentHandler);