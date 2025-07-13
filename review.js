const reviewForm = document.getElementById('review-form');
const reviewList = document.getElementById('review-list');

// Load and display saved reviews from localStorage
function loadReviews() {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviewList.innerHTML = '';

  reviews.forEach(review => {
    const reviewItem = document.createElement('li');
    reviewItem.innerHTML = `
      <strong>${review.name}</strong> - <em>${'⭐'.repeat(review.rating)}</em>
      <p>${review.comment}</p>
    `;
    reviewList.appendChild(reviewItem);
  });
}

// Save new review to localStorage
function saveReview(review) {
  const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
  reviews.push(review);
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Handle form submission
reviewForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const rating = document.getElementById('rating').value;
  const comment = document.getElementById('comment').value.trim();

  if (!name || !rating || !comment) {
    alert('Please fill in all fields.');
    return;
  }

  const newReview = {
    name,
    rating,
    comment
  };

  saveReview(newReview);
  loadReviews();       // Refresh displayed list
  reviewForm.reset();  // Clear form
});

// Load reviews on page load
window.addEventListener('DOMContentLoaded', loadReviews);
