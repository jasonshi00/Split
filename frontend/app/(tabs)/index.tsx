import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, TouchableWithoutFeedback } from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

interface Transaction {
  id: number;
  merchant: string;
  amount: number;
  date: string;
  type: string;
  category: string;
}

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [filterCategory, setFilterCategory] = useState("All");
  const [newMerchant, setNewMerchant] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [suggestedCategory, setSuggestedCategory] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Other");

  useEffect(() => {
    if (filterCategory === "All") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(transactions.filter((txn) => txn.category === filterCategory));
    }
  }, [filterCategory, transactions]);

  const handleAddTransaction = () => {
    if (newMerchant.trim() && newAmount.trim()) {
      // Send the merchant name to OpenAI's API to get a category suggestion
      getCategorySuggestion(newMerchant);
      setIsModalVisible(true);
    }
  };

  const getCategorySuggestion = async (merchant : string) => {
    console.log("sending")
    try {
        const response = await axios.post('http://localhost:8080/api/get-category', { merchant });
        console.log("suggested: ", response)
        const category = response.data.category;
        console.log("suggested: ", category)
        setSuggestedCategory(category);
    } catch (error) {
        console.error("Error getting category suggestion:", error);
        setSuggestedCategory("Other");
    }
};
  
  const confirmAddTransaction = () => {
    const newTxn: Transaction = {
      id: transactions.length + 1,
      merchant: newMerchant,
      amount: parseFloat(newAmount),
      date: new Date().toLocaleDateString(),
      type: "debit",
      category: selectedCategory,
    };

    setTransactions([...transactions, newTxn]);
    setNewMerchant("");
    setNewAmount("");
    setIsModalVisible(false);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Recent Transactions</Text>

      {/* Category Filter */}
      <Picker selectedValue={filterCategory} onValueChange={setFilterCategory} style={styles.select}>
        <Picker.Item label="All" value="All" />
        <Picker.Item label="Shopping" value="Shopping" />
        <Picker.Item label="Income" value="Income" />
        <Picker.Item label="Rent" value="Rent" />
        <Picker.Item label="Transportation" value="Transportation" />
      </Picker>

      {/* Transaction List */}
      <View style={styles.list}>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((txn) => (
            <View key={txn.id} style={styles.card}>
              <View style={styles.transactionDetails}>
                <Text style={styles.merchant}>{txn.merchant}</Text>
                <Text style={styles.date}>{txn.date}</Text>
              </View>
              <Text style={txn.type === "credit" ? styles.credit : styles.debit}>
                {txn.type === "credit" ? "+" : "-"}${Math.abs(txn.amount).toFixed(2)}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noTransactions}>No transactions found.</Text>
        )}
      </View>

      {/* Add Transaction */}
      <View style={styles.inputContainer}>
        <TextInput value={newMerchant} onChangeText={setNewMerchant} placeholder="Enter transaction" style={styles.input} />
        <TextInput value={newAmount} onChangeText={setNewAmount} placeholder="Enter amount" keyboardType="numeric" style={styles.input} />
        <TouchableOpacity onPress={handleAddTransaction} style={styles.addButton}>
          <Text style={styles.addButtonText}>Add Transaction</Text>
        </TouchableOpacity>
      </View>

      {/* Modal for Category Selection */}
      <Modal visible={isModalVisible} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={[styles.modalOverlay, isModalVisible && { backgroundColor: "rgba(0, 0, 0, 0.5)" }]}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Suggested Category</Text>
                {suggestedCategory ? (
                  <Text style={styles.suggestedCategory}>Suggested Category: {suggestedCategory}</Text>
                ) : (
                  <Text style={styles.suggestedCategory}>Finding category...</Text>
                )}

                {/* Display the suggested category and do not allow modification */}
                <TouchableOpacity onPress={confirmAddTransaction} style={styles.addButton}>
                  <Text style={styles.addButtonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#f9f9f9", borderRadius: 8, flexGrow: 1 },
  header: { paddingTop: 30, fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  select: { padding: 10, width: "100%", borderRadius: 4, marginBottom: 20, borderColor: "#ccc", borderWidth: 1 },
  list: { marginTop: 20 },
  card: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15, backgroundColor: "#fff", marginBottom: 10, borderRadius: 8 },
  transactionDetails: { flexDirection: "column", justifyContent: "center" },
  merchant: { fontWeight: "bold", fontSize: 16 },
  date: { color: "#888", fontSize: 14 },
  debit: { color: "red", fontSize: 18, fontWeight: "bold" },
  credit: { color: "green", fontSize: 18, fontWeight: "bold" },
  inputContainer: { flexDirection: "column", marginTop: 20 },
  input: { padding: 12, fontSize: 16, marginBottom: 10, borderRadius: 4, borderColor: "#ccc", borderWidth: 1, width: "100%" },
  addButton: { padding: 12, backgroundColor: "#4CAF50", borderRadius: 4, alignItems: "center" },
  addButtonText: { color: "#fff", fontSize: 16 },
  noTransactions: { textAlign: "center", fontSize: 16, color: "#888", marginTop: 20 },
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center" },
  modalContent: { padding: 20, backgroundColor: "#fff", borderRadius: 8, width: "80%", elevation: 5 },
  modalHeader: { fontSize: 18, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  suggestedCategory: { fontSize: 16, marginBottom: 10, textAlign: "center" },
});
