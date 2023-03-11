const editPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#editPostTitle').value.trim();
  const postContent = document.querySelector('#editPostContent').value.trim();
  const url = document.querySelector('#editPostLink').value.trim() || null;
  const id = document.getElementById('editPostTitle').getAttribute('data-post-id');

  if (title && postContent) {
    const response = await fetch(`/api/posts/post/${ id }`, {
      method: 'PUT',
      body: JSON.stringify({ title, postContent, url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
      alert('Post updated!');
    } else {
      alert('Failed to update post');
    }
  }
};

document
  .querySelector('.editPostForm')
  .addEventListener('submit', editPostHandler);