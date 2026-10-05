Expense Tracker
A simple and responsive JavaScript-based Expense Tracker that helps users manage income and expenses, organize transactions by category, visualize spending, and persist data using browser local storage.
Features
- Add income and expense transactions
- Categorize transactions
- Edit existing transactions
- Delete individual transactions
- Clear all transactions
- Filter transactions by category
- Filter transactions by transaction type
- Sort transactions
- Calculate:
  - Total balance
  - Total income
  - Total expenses
- Visualize expenses using a doughnut chart
- Automatically update statistics and charts when transactions change
- Persist transactions using localStorage
- Dark and light theme
- Persist selected theme across page refreshes
- Reset transaction form after adding a transaction
- Input validation for transactions
- Responsive interface for different screen sizes
Tech Stack
- HTML5 — Application structure
- CSS3 — Styling, responsive layout, and themes
- JavaScript (ES6+) — Application logic and DOM manipulation
- Chart.js — Expense visualization
- Browser LocalStorage — Persistent client-side data storage
- Font Awesome — Icons
Project Structure
Expense-tracker/
│
├── index.html
├── style.css
├── script.js
└── README.md

How It Works
The application stores transactions as JavaScript objects inside a transactions array.
Each transaction contains information such as:
ID
Description
Amount
Category
Type

The transactions array acts as the application's main source of truth. The interface, statistics, filters, and chart are generated from this data.
Transactions are stored in the browser's localStorage, allowing the data to remain available after refreshing or reopening the page.
Application Flow
User Input
    ↓
Validation
    ↓
Transaction Object
    ↓
transactions[]
    ↓
localStorage
    ↓
Render Transactions
    ↓
Update Statistics
    ↓
Update Chart

Statistics
The dashboard calculates:
- Total Income — Sum of all income transactions
- Total Expenses — Sum of all expense transactions
- Total Balance — Total income minus total expenses
Expense Visualization
The application uses Chart.js to display expenses by category through a doughnut chart.
For example:
Food        ₹2,000
Transport   ₹1,500
Shopping    ₹1,000
Other         ₹500

The chart automatically updates when transactions are added, edited, or deleted.
Data Persistence
Transactions are stored using the browser's localStorage.
This means users can:
- Add transactions
- Close or refresh the browser
- Return to the application
- Continue with their previously saved transactions
The application also stores the selected light/dark theme.
Validation
The application validates transaction data before updating the application state.
Examples include:
- Description cannot be empty
- Amount must be greater than zero
- Category must be provided
- Transaction type must be either income or expense
During editing, values are validated before modifying the existing transaction.
