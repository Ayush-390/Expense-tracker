// Store all transactions
const transactions = [
    {
        description: "Uber",
        amount: 250,
        category: "Transport",
        type: "expense"
    }
];

// Get HTML elements
const descInput = document.getElementById('descInput');
const amountInput = document.getElementById('amountInput');
const categorySelect = document.getElementById('categorySelect');
const addBtn = document.getElementById('addBtn');

// Add transaction when button is clicked
addBtn.addEventListener('click', function() {

    // Get the currently selected income/expense option
    const selectedType = document.querySelector('input[name="type"]:checked');

    // Validate description
    if (descInput.value.trim() === "") {
        console.log("Description is required");
        return;
    }

    // Convert amount from string to number
    const amount = Number(amountInput.value);

    // Validate amount
    if (amount <= 0) {
        console.log("Enter a valid amount");
        return;
    }

    // Create transaction object
    const transaction = {
        description: descInput.value,
        amount: amount,
        category: categorySelect.value,
        type: selectedType.value
    };

    // Store transaction in the array
    transactions.push(transaction);

});