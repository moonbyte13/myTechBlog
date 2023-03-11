const newPostHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#newGoalTitle').value.trim();
  const postContent = document.querySelector('#newGoalContent').value.trim();
  const url = document.querySelector('#newGoalLink').value.trim() || null;
  if (title && postContent) {
    const response = await fetch('/api/posts/post', {
      method: 'POST',
      body: JSON.stringify({ title, postContent, url }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      document.location.replace('/dashboard');
      alert('Post created!');
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('.newPostForm')
  .addEventListener('submit', newPostHandler);