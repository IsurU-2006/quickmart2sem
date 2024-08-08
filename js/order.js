document.addEventListener('DOMContentLoaded', () => {
    updateTotalPrice();
    loadFavourite();
});

//sidebar
function showSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar(){
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}

//Add to cart button
function addToCart(button) {
    const box = button.parentElement;
    const productName = box.querySelector('h2').innerText;
    const productPrice = parseFloat(box.getAttribute('data-price'));
   
    const orderItems = document.getElementById('order-items');
    let existingRow = Array.from(orderItems.children).find(row => row.dataset.productName === productName);
   
    if (existingRow) {
        const quantityCell = existingRow.querySelector('.quantity-input');
        const priceCell = existingRow.querySelector('.price');
        const newQuantity = parseInt(quantityCell.value) + 1;
        quantityCell.value = newQuantity;
        priceCell.innerText = `Rs.${(newQuantity * productPrice).toFixed(2)}`;
    } else {
        const row = document.createElement('tr');
        row.dataset.productName = productName;
        row.dataset.productPrice = productPrice;
        row.innerHTML = `
            <td class="item">${productName} (Rs. ${productPrice})</td>
            <td><input type="number" class="quantity-input" value="1" min="0" onchange="updateItemQuantity(this)"></td>
            <td class="price">Rs.${productPrice.toFixed(2)}</td>
        `;
        orderItems.appendChild(row);
    }
   
    updateTotalPrice();
}

//update quantity
function updateItemQuantity(input) {
    const row = input.parentElement.parentElement;
    const productPrice = parseFloat(row.dataset.productPrice);
    const quantity = parseInt(input.value);
    const priceCell = row.querySelector('.price');
   
    if (quantity <= 0) {
        row.remove();
    } else {
        priceCell.innerText = `Rs.${(quantity * productPrice).toFixed(2)}`;
    }
   
    updateTotalPrice();
}

//update price
function updateTotalPrice() {
    const orderItems = document.getElementById('order-items');
    let total = 0;
    Array.from(orderItems.children).forEach(row => {
        const priceCell = row.querySelector('.price');
        const price = parseFloat(priceCell.innerText.replace('Rs.', ''));
        total += price;
    });
    document.getElementById('total-price').innerText = `Rs.${total.toFixed(2)}`;
}

//clear cart button
function clearCart() {
    document.getElementById('order-items').innerHTML = '';
    updateTotalPrice();
}

//buynow button
function buyNow() {
    const orderItems = document.getElementById('order-items');
    const orderData = [];
    Array.from(orderItems.children).forEach(row => {
        const productName = row.dataset.productName;
        const productPrice = row.dataset.productPrice;
        const quantity = row.querySelector('.quantity-input').value;
        orderData.push({ productName, productPrice, quantity });
    });
    localStorage.setItem('orderData', JSON.stringify(orderData));
    window.location.href = 'buynow.html';
}

//Add to favourite button
function saveFavourite() {
    const orderItems = document.getElementById('order-items');
    const favouriteItems = [];
    Array.from(orderItems.children).forEach(row => {
        const productName = row.dataset.productName;
        const productPrice = row.dataset.productPrice;
        const quantity = row.querySelector('.quantity-input').value;
        favouriteItems.push({ productName, productPrice, quantity });
    });
    localStorage.setItem('favouriteOrder', JSON.stringify(favouriteItems));
    alert('Order saved as favourite!');
}

//Apply favourite button 
function applyFavourite() {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));
    if (favouriteOrder) {
        const orderItems = document.getElementById('order-items');
        orderItems.innerHTML = '';
        favouriteOrder.forEach(item => {
            const row = document.createElement('tr');
            row.dataset.productName = item.productName;
            row.dataset.productPrice = item.productPrice;
            row.innerHTML = `
                <td class="item">${item.productName} (Rs. ${item.productPrice})</td>
                <td><input type="number" class="quantity-input" value="${item.quantity}" min="0" onchange="updateItemQuantity(this)"></td>
                <td class="price">Rs.${(item.quantity * item.productPrice).toFixed(2)}</td>
            `;
            orderItems.appendChild(row);
        });
        updateTotalPrice();
    } else {
        alert('No favourite order found!');
    }
}