import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CurrencyDollar, ArrowUpRight, ArrowDownLeft } from "lucide-react";

const transactions = [
  { id: 1, merchant: "Groud Beef", amount: -19.99, date: "Feb 2, 2025", type: "debit", category: "Shopping" },
  { id: 2, merchant: "Sausages", amount: -23.49, date: "Feb 1, 2025", type: "debit", category: "Shopping" },
  { id: 3, merchant: "Rent Money", amount: -1500.00, date: "Jan 30, 2025", type: "debit", category: "Rent" },
  { id: 4, merchant: "Uber", amount: -25.99, date: "Jan 29, 2025", type: "debit", category: "Transportation" },
];

export default function Transactions() {
  const [categories, setCategories] = useState(
    transactions.reduce((acc, txn) => ({ ...acc, [txn.id]: txn.category }), {})
  );
  const [filterCategory, setFilterCategory] = useState("All");
  const [filteredTransactions, setFilteredTransactions] = useState(transactions);
  const [newTransaction, setNewTransaction] = useState("");

  useEffect(() => {
    if (filterCategory === "All") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter((txn) => categories[txn.id] === filterCategory)
      );
    }
  }, [filterCategory, categories]);

  const handleCategoryChange = (id, newCategory) => {
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
    <div className="p-4 max-w-sm mx-auto">
      <div className="bg-blue-100 text-blue-700 p-3 rounded-md mb-4">
        Want to keep track of your recent payment?
      </div>
      <h1 className="text-xl font-semibold mb-4">Recent Shopping Transactions</h1>
      <Select onValueChange={setFilterCategory} value={filterCategory} className="mb-4">
        <SelectTrigger>
          <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Income">Income</SelectItem>
          <SelectItem value="Rent">Rent</SelectItem>
          <SelectItem value="Transportation">Transportation</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
        </SelectContent>
      </Select>
      <ScrollArea className="h-96 w-full">
        {filteredTransactions.map((txn) => (
          <Card key={txn.id} className="mb-2">
            <CardContent className="flex justify-between items-center p-4">
              <div className="flex items-center space-x-2">
                {txn.type === "credit" ? (
                  <ArrowDownLeft className="text-green-500" size={20} />
                ) : (
                  <ArrowUpRight className="text-red-500" size={20} />
                )}
                <div>
                  <p className="font-medium">{txn.merchant}</p>
                  <p className="text-sm text-gray-500">{txn.date}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Badge
                  className={`text-sm px-3 py-1 ${txn.type === "credit" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                >
                  {txn.type === "credit" ? "+" : "-"}${Math.abs(txn.amount).toFixed(2)}
                </Badge>
                <Select
                  value={categories[txn.id]}
                  onValueChange={(value) => handleCategoryChange(txn.id, value)}
                  className="mt-1 text-xs"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Shopping">Shopping</SelectItem>
                    <SelectItem value="Income">Income</SelectItem>
                    <SelectItem value="Food & Drinks">Food & Drinks</SelectItem>
                    <SelectItem value="Transport">Transport</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
      <div className="mt-4 flex items-center space-x-2">
        <Input
          value={newTransaction}
          onChange={(e) => setNewTransaction(e.target.value)}
          placeholder="Enter transaction"
          className="flex-1"
        />
        <Button onClick={handleAddTransaction}>Add</Button>
      </div>
    </div>
  );
}
