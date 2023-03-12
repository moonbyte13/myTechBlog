// Function to handle the delete post button
const deleteCommentHandler = async (event) => {
  event.preventDefault();
  // Get the post id from the delete button
  const id = document.getElementById('deleteCommentBtn').getAttribute('data-comment-id');
  // Send a DELETE request to the API endpoint
  const response = await fetch(`/api/comments/comment/${ id }`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // If the response is ok, redirect to the dashboard and alert the user that the post was deleted
  if (response.ok) {
    document.location.reload();
    alert('Comment deleted!');
  } else {
    alert('Failed to delete Comment');
  }
};

// querySelector for the delete post button and add an event listener for the click event
document
  .querySelector('#deleteCommentBtn')
  .addEventListener('click', deleteCommentHandler);