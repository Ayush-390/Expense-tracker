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
     // Add income/expense class
    div.classList.add(transaction.type);

    // Create information section
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('expense-info');
     infoDiv.textContent =
    `${transaction.description} - ${transaction.category}`;

    // Add information sec outside of transaction card--"Take infoDiv and make it a child of div."
    div.appendChild(infoDiv);




    // Create amount section
    const amountDiv = document.createElement('div');
    amountDiv.classList.add('expense-amount');

    amountDiv.textContent = `₹${transaction.amount}`;

     // Add amount section inside transaction card
    div.appendChild(amountDiv);

    // Create actions container
    const actionsDiv = document.createElement('div');
    actionsDiv.classList.add('expense-actions');

    // Create Edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-btn');

    // Create Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-btn');

    // Add buttons to actions container
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    // Add action container inside transaction card
    div.appendChild(actionsDiv);

    // Add transaction card inside expenses list
    expensesList.appendChild(div);
    
});
