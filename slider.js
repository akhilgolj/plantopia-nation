let cartData = JSON.parse(localStorage.getItem('cartData')) || [];

function updateCartSlider() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.getElementById('cart-count');
    if (!cartItemsContainer || !cartTotal || !cartCount) return;

    cartItemsContainer.innerHTML = '';
    let total = 0;
    let totalItems = 0;

    cartData.forEach(item => {
        if (!item.price) return;
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <img src="${item.image || 'default-image.jpg'}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
            <span class="item-name">${item.name}</span>
            <div class="quantity-controls">
                <button class="quantity-btn minus" data-index="${item.index}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-index="${item.index}">+</button>
            </div>
            <span class="item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="delete-btn" data-index="${item.index}"><i class="fas fa-trash-alt"></i></button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price * item.quantity;
        totalItems += item.quantity;
    });

    cartTotal.textContent = total.toFixed(2);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    attachCartEventListeners();
}

function attachCartEventListeners() {
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            const cartItem = cartData.find(item => item.index === index);
            if (cartItem) {
                if (e.target.classList.contains('plus')) {
                    cartItem.quantity++;
                    showNotification(`Added one more ${cartItem.name} to cart`);
                } else if (e.target.classList.contains('minus')) {
                    cartItem.quantity--;
                    if (cartItem.quantity <= 0) {
                        cartData = cartData.filter(item => item.index !== index);
                        showNotification(`${cartItem.name} removed from cart`);
                    } else {
                        showNotification(`Removed one ${cartItem.name} from cart`);
                    }
                }
                saveCartToLocalStorage();
                updateCartSlider();
            }
        });
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.closest('.delete-btn').getAttribute('data-index');
            const cartItem = cartData.find(item => item.index === index);
            if (cartItem) {
                cartData = cartData.filter(item => item.index !== index);
                showNotification(`${cartItem.name} removed from cart`);
                saveCartToLocalStorage();
                updateCartSlider();
            }
        });
    });
}

function updateCartCount() {
    const cartCountEl = document.getElementById('cart-count');
    if (!cartCountEl) return;
    const totalItems = cartData.reduce((sum, item) => sum + item.quantity, 0);
    cartCountEl.textContent = totalItems;
    cartCountEl.style.display = totalItems > 0 ? 'flex' : 'none';
}

function saveCartToLocalStorage() {
    localStorage.setItem('cartData', JSON.stringify(cartData));
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.classList.add('notification');
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 2000);
    }, 10);
}

document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cart-icon');
    const cartSlider = document.getElementById('cart-slider');
    const closeCartButton = document.getElementById('close-cart');

    updateCartSlider();
    updateCartCount();

    if (cartButton && cartSlider) {
        cartButton.addEventListener('click', () => {
            cartSlider.style.transform = 'translateX(0)';
            updateCartSlider();
        });
    }

    if (closeCartButton && cartSlider) {
        closeCartButton.addEventListener('click', () => {
            cartSlider.style.transform = 'translateX(100%)';
        });
    }
});