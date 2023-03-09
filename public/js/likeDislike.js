let likeCount = 0;

const incrementLikeCount = () => {
  likeCount++;
  updateLikeCount();
};
const decrementLikeCount = () => {
  if (likeCount > 0) {
    likeCount--;
    updateLikeCount();
  }
};

// missing id delcaration
function updateLikeCount(postId) {
  const url = `/api/posts/${ postId }/likeCount`;
  fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      likeCount
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(() => {
    document.reload();
  });
}

const likeBtn = document.getElementById('likeBtn');
likeBtn.addEventListener('click', incrementLikeCount);

const dislikeBTN = document.getElementById('dislikeBtn');
dislikeBTN.addEventListener('click', decrementLikeCount);