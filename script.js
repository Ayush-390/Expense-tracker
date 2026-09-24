// Store all transactions
const transactions = [
    {
        id: Date.now(),
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
// for Statistics
const totalBalance = document.getElementById('totalBalance');
const totalIncome = document.getElementById('totalIncome');
const totalExpenses = document.getElementById('totalExpenses');


// Render one transaction on the webpage
function renderTransaction(transaction) {

    // Create transaction card
    const div = document.createElement('div');
    div.classList.add('expense-item');
    div.classList.add(transaction.type);

    // Create information section
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('expense-info');

    infoDiv.textContent =
        `${transaction.description} - ${transaction.category}`;

    // Add information section inside transaction card
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


    // Delete transaction
    deleteBtn.addEventListener('click', function() {

        const index = transactions.findIndex(function(item) {
            return item.id === transaction.id;
        });

        transactions.splice(index, 1);

        div.remove();
    });


    // Add buttons to actions container
    actionsDiv.appendChild(editBtn);
    actionsDiv.appendChild(deleteBtn);

    // Add actions container to transaction card
    div.appendChild(actionsDiv);

    // Add transaction card to expenses list
    expensesList.appendChild(div);
}

function calculateStats() {

    let income = 0;
    let expenses = 0;

    transactions.forEach(function(transaction) {

       if(transaction.type === "income")
       income = income + transaction.amount;
           else if (transaction.type === "expense") 
            expenses += transaction.amount;
        });

      const balance = income - expenses;  
      return {
    income: income,
    expenses: expenses,
    balance: balance
    };

}
// Get calculated statistics
const stats = calculateStats();

// Update statistics on webpage
totalIncome.textContent = stats.income;
totalExpenses.textContent = stats.expenses;
totalBalance.textContent = stats.balance;

// Render existing transactions
transactions.forEach(function(transaction) {
    renderTransaction(transaction);
});



// Add transaction when button is clicked
addBtn.addEventListener('click', function() {

    // Get currently selected income/expense option
    const selectedType =
        document.querySelector('input[name="type"]:checked');


    // Validate description
    if (descInput.value.trim() === "") {
        console.log("Description is required");
        return;
    }


    // Convert amount to number
    const amount = Number(amountInput.value);


    // Validate amount
    if (amount <= 0) {
        console.log("Enter a valid amount");
        return;
    }


    // Create transaction object
    const transaction = {
        id: Date.now(),
        description: descInput.value.trim(),
        amount: amount,
        category: categorySelect.value,
        type: selectedType.value
    };


    // Store transaction in array
    transactions.push(transaction);


    // Display transaction on webpage
    renderTransaction(transaction);
});