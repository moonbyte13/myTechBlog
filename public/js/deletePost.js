const deletePostHandler = async (event) => {
  event.preventDefault();
  const id = document.getElementById('deletePostBtn').getAttribute('data-post-id');
  const response = await fetch(`/api/posts/post/${ id }`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.ok) {
    document.location.replace('/dashboard');
    alert('Post deleted!');
  } else {
    alert('Failed to delete post');
  }
};

document
  .querySelector('#deletePostBtn')
  .addEventListener('click', deletePostHandler);