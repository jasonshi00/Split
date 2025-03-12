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
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Picker } from '@react-native-picker/picker'; // Correct import for Picker

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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Recent Transactions</Text>

      {/* Category Filter */}
      <Picker
        selectedValue={filterCategory}
        onValueChange={(itemValue) => setFilterCategory(itemValue)}
        style={styles.select}
      >
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Income" value="Income" />
        <Picker.Item label="Rent" value="Rent" />
        <Picker.Item label="Transportation" value="Transportation" />
        <Picker.Item label="Other" value="Other" />
      </Picker>

      {/* Transaction List */}
      <View style={styles.list}>
        {filteredTransactions.map((txn) => (
          <View key={txn.id} style={styles.card}>
            <View style={styles.transactionDetails}>
              <Text style={styles.merchant}>{txn.merchant}</Text>
              <Text style={styles.date}>{txn.date}</Text>
            </View>
            <Text style={txn.type === "credit" ? styles.credit : styles.debit}>
              {txn.type === "credit" ? "+" : "-"}${Math.abs(txn.amount).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Add Transaction */}
      <View style={styles.inputContainer}>
        <TextInput
          value={newTransaction}
          onChangeText={setNewTransaction}
          placeholder="Enter transaction"
          style={styles.input}
        />
        <TouchableOpacity onPress={handleAddTransaction} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>

      {/* Category Update */}
      <View style={styles.categoryUpdate}>
        {filteredTransactions.map((txn) => (
          <View key={txn.id} style={styles.categoryContainer}>
            <Text style={styles.transactionCategory}>Category: {categories[txn.id]}</Text>
            <Picker
              selectedValue={categories[txn.id]}
              onValueChange={(value) => handleCategoryChange(txn.id, value)}
              style={styles.select}
            >
              <Picker.Item label="Shopping" value="Shopping" />
              <Picker.Item label="Income" value="Income" />
              <Picker.Item label="Rent" value="Rent" />
              <Picker.Item label="Transportation" value="Transportation" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  select: {
    padding: 10,
    width: "100%",
    borderRadius: 4,
    marginBottom: 20,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  list: {
    marginTop: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 8,
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  transactionDetails: {
    flexDirection: "column",
    justifyContent: "center",
  },
  merchant: {
    fontWeight: "bold",
    fontSize: 16,
  },
  date: {
    color: "#888",
    fontSize: 14,
  },
  debit: {
    color: "red",
    fontSize: 18,
    fontWeight: "bold",
  },
  credit: {
    color: "green",
    fontSize: 18,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "column",
    marginTop: 20,
  },
  input: {
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
  },
  addButton: {
    padding: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 4,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  categoryUpdate: {
    marginTop: 20,
  },
  categoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  transactionCategory: {
    fontWeight: "bold",
    marginRight: 10,
  },
});
