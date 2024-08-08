document.addEventListener('DOMContentLoaded', () => {
    // Load the stored order data and populate the order summary table
    const orderData = JSON.parse(localStorage.getItem('orderData')) || [];
    const orderItemsContainer = document.getElementById('order-items');
    let total = 0;

    orderData.forEach(item => {
        const row = document.createElement('tr');
        const itemTotalPrice = (item.quantity * item.productPrice).toFixed(2);
        row.innerHTML = `
            <td class="item">${item.productName} (Rs. ${item.productPrice})</td>
            <td><input type="number" class="quantity-input" value="${item.quantity}" min="0" readonly></td>
            <td class="price">Rs.${itemTotalPrice}</td>
        `;
        orderItemsContainer.appendChild(row);
        total += parseFloat(itemTotalPrice);
    });

    document.getElementById('total-price').innerText = `Rs. ${total.toFixed(2)}`;

    // Handle the payment form submission
    const paymentForm = document.getElementById('paymentForm');
    const messageDiv = document.getElementById('message');

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const customerName = document.getElementById('customerName').value;
        const customerPhone = document.getElementById('customerPhone').value;
        const customerEmail = document.getElementById('customerEmail').value;
        const customerAddress = document.getElementById('customerAddress').value;
        const customerCity = document.getElementById('customerCity').value;
        const customerPostalCode = document.getElementById('customerPostalCode').value;
        const cardNumber = document.getElementById('cardNumber').value;
        const cardCVC = document.getElementById('cardCVC').value;
        const expMonth = document.getElementById('expMonth').value;
        const expYear = document.getElementById('expYear').value;

        // Simple validation check for demonstration
        if (customerName && customerPhone && customerEmail && customerAddress &&
            customerCity && customerPostalCode && cardNumber && cardCVC && expMonth && expYear) {

            // Display thank you message with a mock delivery date
            const deliveryDate = new Date();
            deliveryDate.setDate(deliveryDate.getDate() + 7); // Delivery in 7 days
            const formattedDate = deliveryDate.toDateString();

            showThankYouPopup(customerName, customerAddress, formattedDate, total);

            // Optionally, clear the form or redirect
            paymentForm.reset();

            // Clear the local storage after successful payment
            localStorage.removeItem('orderData');

        } else {
            messageDiv.innerHTML = 'Please fill in all required fields.';
        }
    });
});

// Function to create and show the thank you popup
function showThankYouPopup(customerName, customerAddress, deliveryDate, total) {
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '20px';
    popup.style.backgroundColor = '#000'; // Black background
    popup.style.color = '#fff'; // White font color
    popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)';
    popup.style.borderRadius = '10px';
    popup.style.textAlign = 'center';

    const content = `
        <p>Thank You for Your Order!</p>
        <p><strong>Delivery Date:</strong> ${deliveryDate}</p>
        <p><strong>Delivery Address:</strong> ${customerAddress}</p>
        <p><strong>Total Price:</strong> Rs. ${total.toFixed(2)}</p>
        <button onclick="closePopup()" style="padding: 10px 20px; margin-top: 10px; background-color: #444; color: #fff; border: none; border-radius: 5px;">Close</button>
    `;

    popup.innerHTML = content;
    document.body.appendChild(popup);
}

// Function to close the popup
function closePopup() {
    const popup = document.querySelector('div[style*="position: fixed"]');
    if (popup) {
        document.body.removeChild(popup);
    }
}

// Sidebar functions
function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
}

function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
}