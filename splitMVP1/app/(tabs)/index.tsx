// import React, { useState, useEffect } from "react";

// const transactions = [
//   { id: 1, merchant: "Ground Beef", amount: -19.99, date: "Feb 2, 2025", type: "debit", category: "Shopping" },
//   { id: 2, merchant: "Sausages", amount: -23.49, date: "Feb 1, 2025", type: "debit", category: "Shopping" },
//   { id: 3, merchant: "Rent Money", amount: -1500.0, date: "Jan 30, 2025", type: "debit", category: "Rent" },
//   { id: 4, merchant: "Uber", amount: -25.99, date: "Jan 29, 2025", type: "debit", category: "Transportation" },
// ];

// export default function Transactions() {
//   const [categories, setCategories] = useState<{ [key: number]: string }>(
//     transactions.reduce((acc, txn) => ({ ...acc, [txn.id]: txn.category }), {})
//   );
//   const [filterCategory, setFilterCategory] = useState("All");
//   const [filteredTransactions, setFilteredTransactions] = useState(transactions);
//   const [newTransaction, setNewTransaction] = useState("");

//   useEffect(() => {
//     if (filterCategory === "All") {
//       setFilteredTransactions(transactions);
//     } else {
//       setFilteredTransactions(transactions.filter((txn) => categories[txn.id] === filterCategory));
//     }
//   }, [filterCategory, categories]);

//   const handleCategoryChange = (id: number, newCategory: string) => {
//     setCategories((prev) => ({ ...prev, [id]: newCategory }));
//   };

//   const handleAddTransaction = () => {
//     if (newTransaction.trim()) {
//       const newTxn = {
//         id: transactions.length + 1,
//         merchant: newTransaction,
//         amount: 0.0,
//         date: new Date().toLocaleDateString(),
//         type: "debit",
//         category: "Other",
//       };
//       setFilteredTransactions([...filteredTransactions, newTxn]);
//       setNewTransaction("");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1>Recent Transactions</h1>

//       {/* Category Filter */}
//       <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
//         <option value="All">All</option>
//         <option value="Shopping">Shopping</option>
//         <option value="Income">Income</option>
//         <option value="Rent">Rent</option>
//         <option value="Transportation">Transportation</option>
//         <option value="Other">Other</option>
//       </select>

//       {/* Transaction List */}
//       <div style={styles.list}>
//         {filteredTransactions.map((txn) => (
//           <div key={txn.id} style={styles.card}>
//             <div>
//               <p style={styles.merchant}>{txn.merchant}</p>
//               <p style={styles.date}>{txn.date}</p>
//             </div>
//             <span style={txn.type === "credit" ? styles.credit : styles.debit}>
//               {txn.type === "credit" ? "+" : "-"}${Math.abs(txn.amount).toFixed(2)}
//             </span>
//           </div>
//         ))}
//       </div>

//       {/* Add Transaction */}
//       <div style={styles.inputContainer}>
//         <input
//           value={newTransaction}
//           onChange={(e) => setNewTransaction(e.target.value)}
//           placeholder="Enter transaction"
//         />
//         <button onClick={handleAddTransaction}>Add Transaction</button>
//       </div>

//       {/* Category Update */}
//       <div style={styles.categoryUpdate}>
//         {filteredTransactions.map((txn) => (
//           <div key={txn.id} style={styles.categoryContainer}>
//             <span style={styles.transactionCategory}>Category: {categories[txn.id]}</span>
//             <select
//               value={categories[txn.id]}
//               onChange={(e) => handleCategoryChange(txn.id, e.target.value)}
//             >
//               <option value="Shopping">Shopping</option>
//               <option value="Income">Income</option>
//               <option value="Rent">Rent</option>
//               <option value="Transportation">Transportation</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Styles are defined directly within the component
// const styles = {
//   container: {
//     padding: "20px",
//     fontFamily: "Arial, sans-serif",
//   },
//   list: {
//     marginTop: "20px",
//   },
//   card: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "10px",
//     borderBottom: "1px solid #ccc",
//   },
//   merchant: {
//     fontWeight: "bold",
//   },
//   date: {
//     color: "#888",
//   },
//   debit: {
//     color: "red",
//   },
//   credit: {
//     color: "green",
//   },
//   inputContainer: {
//     marginTop: "20px",
//     display: "flex",
//     gap: "10px",
//   },
//   categoryUpdate: {
//     marginTop: "20px",
//   },
//   categoryContainer: {
//     display: "flex",
//     alignItems: "center",
//     marginBottom: "10px",
//   },
//   transactionCategory: {
//     marginRight: "10px",
//   },
// };
import React, { useState, useEffect } from "react";

const transactions = [
  { id: 1, merchant: "Ground Beef", amount: -19.99, date: "Feb 2, 2025", type: "debit", category: "Shopping" },
  { id: 2, merchant: "Sausages", amount: -23.49, date: "Feb 1, 2025", type: "debit", category: "Shopping" },
  { id: 3, merchant: "Rent Money", amount: -1500.0, date: "Jan 30, 2025", type: "debit", category: "Rent" },
  { id: 4, merchant: "Uber", amount: -25.99, date: "Jan 29, 2025", type: "debit", category: "Transportation" },
];

export default function Transactions() {
  const [categories, setCategories] = useState<{ [key: number]: string }>(
    transactions.reduce((acc, txn) => ({ ...acc, [txn.id]: txn.category }), {})
  );
  const [filterCategory, setFilterCategory] = useState("All");
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [newTransaction, setNewTransaction] = useState("");

  useEffect(() => {
    if (filterCategory === "All") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter((txn) => categories[txn.id] === filterCategory));
    }
  }, [filterCategory, categories]);

  const handleCategoryChange = (id: number, newCategory: string) => {
    setCategories((prev) => ({ ...prev, [id]: newCategory }));
  };

  const handleAddTransaction = () => {
    if (newTransaction.trim()) {
      const newTxn = {
        id: transactions.length + 1,
        merchant: newTransaction,
        amount: 0.0,
        date: new Date().toLocaleDateString(),
        type: "debit",
        category: "Other",
      };
      setFilteredTransactions([...filteredTransactions, newTxn]);
      setNewTransaction("");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={{ ...styles.header, textAlign: 'center' }}>Recent Transactions</h1>

      {/* Category Filter */}
      <select
        onChange={(e) => setFilterCategory(e.target.value)}
        value={filterCategory}
        style={styles.select}
      >
        <option value="All">All</option>
        <option value="Shopping">Shopping</option>
        <option value="Income">Income</option>
        <option value="Rent">Rent</option>
        <option value="Transportation">Transportation</option>
        <option value="Other">Other</option>
      </select>

      {/* Transaction List */}
      <div style={styles.list}>
        {filteredTransactions.map((txn) => (
          <div key={txn.id} style={styles.card}>
            <div style={styles.transactionDetails}>
              <p style={styles.merchant}>{txn.merchant}</p>
              <p style={styles.date}>{txn.date}</p>
            </div>
            <span style={txn.type === "credit" ? styles.credit : styles.debit}>
              {txn.type === "credit" ? "+" : "-"}${Math.abs(txn.amount).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Add Transaction */}
      <div style={styles.inputContainer}>
        <input
          value={newTransaction}
          onChange={(e) => setNewTransaction(e.target.value)}
          placeholder="Enter transaction"
          style={styles.input}
        />
        <button onClick={handleAddTransaction} style={styles.addButton}>
          Add Transaction
        </button>
      </div>

      {/* Category Update */}
      <div style={styles.categoryUpdate}>
        {filteredTransactions.map((txn) => (
          <div key={txn.id} style={styles.categoryContainer}>
            <span style={styles.transactionCategory}>Category: {categories[txn.id]}</span>
            <select
              value={categories[txn.id]}
              onChange={(e) => handleCategoryChange(txn.id, e.target.value)}
              style={styles.select}
            >
              <option value="Shopping">Shopping</option>
              <option value="Income">Income</option>
              <option value="Rent">Rent</option>
              <option value="Transportation">Transportation</option>
              <option value="Other">Other</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

// Styles with responsive, mobile-friendly adjustments
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    fontSize: "24px",
    marginBottom: "20px",
    textAlign: 'center' as 'center', // Explicitly define 'center' type
  },
  select: {
    padding: "8px",
    width: "100%",
    borderRadius: "4px",
    marginBottom: "20px",
    border: "1px solid #ccc",
  },
  list: {
    marginTop: "20px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#fff",
    marginBottom: "10px",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  transactionDetails: {
    display: "flex" as "flex",
    flexDirection: "column" as "column", // Explicitly define 'column' type for flexDirection
    justifyContent: "center" as "center", // Explicitly define 'center' type for justifyContent
  },
  merchant: {
    fontWeight: "bold",
    fontSize: "16px",
    margin: "0",
  },
  date: {
    color: "#888",
    fontSize: "14px",
  },
  debit: {
    color: "red",
    fontSize: "18px",
    fontWeight: "bold",
  },
  credit: {
    color: "green",
    fontSize: "18px",
    fontWeight: "bold",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column" as "column", // Explicitly define 'column' type for flexDirection
    marginTop: "20px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    marginBottom: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    width: "100%",
  },
  addButton: {
    padding: "12px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  categoryUpdate: {
    marginTop: "20px",
  },
  categoryContainer: {
    display: "flex" as "flex",
    alignItems: "center",
    marginBottom: "15px",
  },
  transactionCategory: {
    fontWeight: "bold",
    marginRight: "10px",
  },
};
