const STORAGE_KEY = "expenseTrackerTransactions";

// Load transactions from localStorage
const savedTransactions = localStorage.getItem(STORAGE_KEY);

const transactions = savedTransactions  //Use saved transactions if they exist; otherwise start with the sample Uber transaction
    ? JSON.parse(savedTransactions)
    : [];

// Save transactions to localStorage
function saveTransactions() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
    );
}    

// Get HTML elements
const descInput = document.getElementById('descInput');
const amountInput = document.getElementById('amountInput');
const categorySelect = document.getElementById('categorySelect');
const addBtn = document.getElementById('addBtn');
const expensesList = document.getElementById('expensesList');
// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const clearAllBtn = document.getElementById('clearAllBtn');
// Chart
const categoryChart = document.getElementById('categoryChart');

// for Statistics
const totalBalance = document.getElementById('totalBalance');
const totalIncome = document.getElementById('totalIncome');
const totalExpenses = document.getElementById('totalExpenses');
// Filter
const filterCategory = document.getElementById('filterCategory');
const filterType = document.getElementById('filterType');




// Render one transaction on the webpage
function renderTransaction(transaction) {

    // Create transaction card
    const div = document.createElement('div');
    div.classList.add('expense-item');
    div.classList.add(transaction.type);

    // Create information section
    const infoDiv = document.createElement('div');
    infoDiv.classList.add('expense-info');

    infoDiv.textContent = `${transaction.description} - ${transaction.category}`;

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

editBtn.addEventListener('click', function() {

    const newDescription = prompt(
        "Enter new description:",
        transaction.description
    );

    if (newDescription === null) {
        return;
    }

    const newAmountInput = prompt(
        "Enter new amount:",
        transaction.amount
    );

    if (newAmountInput === null) {
        return;
    }

    const newAmount = Number(newAmountInput);

    if (newDescription.trim() === "") {
        console.log("Description is required");
        return;
    }

    if (newAmount <= 0 || isNaN(newAmount)) {
        console.log("Enter a valid amount");
        return;
    }

    transaction.description = newDescription.trim();
    transaction.amount = newAmount;

    const newCategory = prompt(
    "Enter new category:",
    transaction.category
);

if (newCategory === null) {
    return;
}

if (newCategory.trim() === "") {
    console.log("Category is required");
    return;
}

transaction.category = newCategory.trim();

const newType = prompt(
    "Enter type (income or expense):",
    transaction.type
);

if (newType === null) {
    return;
}

if (newType !== "income" && newType !== "expense") {
    console.log("Enter either income or expense");
    return;
}

transaction.type = newType;

saveTransactions();
renderTransactions();
renderCategoryChart();
updateStats();
});


 

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
        renderTransactions();
         // Update statistics after deleting
         saveTransactions();
         renderCategoryChart(); //for chart
         updateStats();
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

function calculateCategoryExpenses() {

   
    const categoryTotals = {};

    transactions.forEach(function(transaction) {

        if (transaction.type === "expense") {

            if (categoryTotals[transaction.category]) {
                categoryTotals[transaction.category] += transaction.amount;
            } else {
                categoryTotals[transaction.category] = transaction.amount;
            }

        }
    });

    return categoryTotals;
}
 function getCategoryChartData() {

    const categoryTotals = calculateCategoryExpenses();

    const labels = Object.keys(categoryTotals);  //keys
    const values = Object.values(categoryTotals); //values

    return {
        labels: labels,
        values: values
    };
}

let categoryChartInstance = null;


function renderCategoryChart() { //Create or update the expense-category doughnut chart.

    const chartData = getCategoryChartData();//give keys, values

    if (categoryChartInstance) {
        categoryChartInstance.destroy(); //for updation of chart
    }
     if (chartData.labels.length === 0) {
        categoryChartInstance = null;
        return;
    }

    categoryChartInstance = new Chart(categoryChart, {  //"Create a chart inside the <canvas> we selected earlier."
        type: 'doughnut',

        data: {
            labels: chartData.labels,

            datasets: [{
                data: chartData.values
            }]
        },

        options: {
            responsive: true
        }
    });
}





function updateStats() {

    const stats = calculateStats();

    totalIncome.textContent = stats.income;
    totalExpenses.textContent = stats.expenses;
    totalBalance.textContent = stats.balance;
}
updateStats();

function filterTransactions() {

    const selectedCategory = filterCategory.value;
    const selectedType = filterType.value;

    const filteredTransactions = transactions.filter(function(transaction) {

        const categoryMatches =
            selectedCategory === "all" ||
            transaction.category === selectedCategory;

        const typeMatches =
            selectedType === "all" ||
            transaction.type === selectedType;

        return categoryMatches && typeMatches;
    });

    return filteredTransactions;
}


function renderTransactions() {

    const filteredTransactions = filterTransactions();

    expensesList.innerHTML = "";

   // Render filtered transactions
    filteredTransactions.forEach(function(transaction) {
    renderTransaction(transaction);
});

}
renderTransactions();
renderCategoryChart();




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
    saveTransactions();

    // Display transaction on webpage
renderTransactions();
renderCategoryChart();
updateStats(); 
});

// Category filter event
filterCategory.addEventListener('change', function() {
    renderTransactions();
});

// Type filter event
filterType.addEventListener('change', function() {
    renderTransactions();
});

// Theme toggle event
themeToggle.addEventListener('click', function() {

    const currentTheme = document.body.getAttribute('data-theme');

    if (currentTheme === 'dark') {
        document.body.setAttribute('data-theme', 'light');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    } else {
        document.body.setAttribute('data-theme', 'dark');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    }

});

// Clear all transactions
clearAllBtn.addEventListener('click', function() {

    transactions.length = 0;

    saveTransactions();
    renderTransactions();
    renderCategoryChart();
    updateStats();
});