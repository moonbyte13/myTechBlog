// Function to handle the delete post button
const deletePostHandler = async (event) => {
  event.preventDefault();
  // Get the post id from the delete button
  const id = document.getElementById('deletePostBtn').getAttribute('data-post-id');
  // Send a DELETE request to the API endpoint
  const response = await fetch(`/api/posts/post/${ id }`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // If the response is ok, redirect to the dashboard and alert the user that the post was deleted
  if (response.ok) {
    document.location.replace('/dashboard');
    alert('Post deleted!');
  } else {
    alert('Failed to delete post');
  }
};

// querySelector for the delete post button and add an event listener for the click event
document
  .querySelector('#deletePostBtn')
  .addEventListener('click', deletePostHandler);