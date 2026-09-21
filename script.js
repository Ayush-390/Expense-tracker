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
const expensesList = document.getElementById('expensesList');

// Add transaction when button is clicked
addBtn.addEventListener('click', function() {

    // Get the currently selected income/expense option
    const selectedType = document.querySelector('input[name="type"]:checked');

    // Validate description
    if (descInput.value.trim() === "") {
        console.log("Description is required");
        return;
    }

    const amount = Number(amountInput.value);

    if (amount <= 0) {
        console.log("Enter a valid amount");
        return;
    }

    const transaction = {
        description: descInput.value,
        amount: amount,
        category: categorySelect.value,
        type: selectedType.value
    };

    transactions.push(transaction);

     // Create transaction card
    const div = document.createElement('div');
    div.classList.add('expense-item');

    // Create information section
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('expense-info');

    // Add transaction description
    infoDiv.textContent = transaction.description;

    // Add information section to transaction card
    div.appendChild(infoDiv);

    // Add transaction card to the expenses list
    expensesList.appendChild(div);

    
});
