// Get 4 random recommendations (to keep it dynamic)
const shuffled = [...recommendedProducts].sort(() => 0.5 - Math.random());
const selectedRecommendations = shuffled.slice(0, 4);

// Create HTML for each recommendation
selectedRecommendations.forEach(product => {
  const itemElement = document.createElement('div');
  itemElement.className = 'suggestion-item';
  itemElement.innerHTML = `
    <img src="${product.image}" alt="${product.name}" class="suggestion-img">
    <div class="suggestion-info">
      <h4 class="suggestion-title">${product.name}</h4>
      <div class="suggestion-price-action">
        <span class="suggestion-price">$${product.price.toFixed(2)}</span>
        <button class="add-suggestion-btn" data-product-id="${product.id}">+</button>
      </div>
    </div>
  `;
  
  container.appendChild(itemElement);
});

// Add event listeners to the newly created buttons
document.querySelectorAll('.add-suggestion-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const productId = parseInt(this.getAttribute('data-product-id'), 10);
    addRecommendationToCart(productId);
  });
});


// Initialize the recommendations when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
renderRecommendations();

// You might want to refresh recommendations when the cart changes
// If you have a custom event for cart updates, you can listen for it here
});