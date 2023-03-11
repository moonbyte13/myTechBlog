// Function to handle the edit post form
const editPostHandler = async (event) => {
  event.preventDefault();
  // Collect values from the edit post form
  const title = document.querySelector('#editPostTitle').value.trim();
  const postContent = document.querySelector('#editPostContent').value.trim();
  const url = document.querySelector('#editPostLink').value.trim() || null;
  const id = document.getElementById('editPostTitle').getAttribute('data-post-id');

  // If the title and postContent are not empty, update the post
  if (title && postContent) {
    // Send a PUT request to the API endpoint
    const response = await fetch(`/api/posts/post/${ id }`, {
      method: 'PUT',
      body: JSON.stringify({ title, postContent, url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // If the response is ok, redirect to the dashboard and alert the user that the post was updated
    if (response.ok) {
      document.location.replace('/dashboard');
      alert('Post updated!');
    } else {
      alert('Failed to update post');
    }
  }
};

// querySelector for the edit post form and add an event listener for the submit event
document
  .querySelector('.editPostForm')
  .addEventListener('submit', editPostHandler);