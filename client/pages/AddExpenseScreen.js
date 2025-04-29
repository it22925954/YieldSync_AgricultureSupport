import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

const API_URL = "http://192.168.103.92:5000/api/expenses"; // Replace with your actual backend URL

const AddExpenseScreen = ({ navigation }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Fetch expenses when the screen loads
  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setExpenses(response.data);
        calculateTotalExpenses(response.data);
      })
      .catch(error => console.error("Error fetching expenses:", error));
  }, []);

  // Set navigation options for the screen
  useEffect(() => {
    navigation.setOptions({
      title: 'Add Expense', // Title of the screen
      headerStyle: { backgroundColor: 'green' }, // Green header
      headerTintColor: '#fff', // White text
    });
  }, [navigation]);

  // Calculate Total Expenses
  const calculateTotalExpenses = (expensesList) => {
    const total = expensesList.reduce((sum, item) => sum + parseFloat(item.amount), 0);
    setTotalExpenses(total);
  };

  // Handle Date Change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

// Validate Input
const validateInputs = () => {
  const safeAmount = typeof amount === 'string' ? amount.trim() : '';

  if (!description.trim() || !safeAmount || !category || category === "Select Category") {
    Alert.alert("Error", "Please fill all fields properly.");
    return false;
  }
  if (isNaN(safeAmount) || parseFloat(safeAmount) <= 0) {
    Alert.alert("Error", "Please enter a valid amount.");
    return false;
  }
  return true;
};


  // Save or update expense
  const handleSaveExpense = () => {
    if (!validateInputs()) return;

    const formattedDate = date.toISOString().split("T")[0]; // Remove time
    const expenseData = { description, amount, category, date: formattedDate };

    if (editingId) {
      axios.put(`${API_URL}/update/${editingId}`, expenseData)
        .then(response => {
          Alert.alert("Updated Successfully", response.data.message);
          const updatedExpenses = expenses.map(exp => exp._id === editingId ? response.data.expense : exp);
          setExpenses(updatedExpenses);
          calculateTotalExpenses(updatedExpenses);
          setEditingId(null);
        })
        .catch(error => Alert.alert("Error", "Failed to update expense."));
    } else {
      axios.post(`${API_URL}/create`, expenseData)
        .then(response => {
          Alert.alert("✅ Saved Successfully", response.data.message);
          const newExpenses = [...expenses, response.data.expense];
          setExpenses(newExpenses);
          calculateTotalExpenses(newExpenses);
        })
        .catch(error => Alert.alert("Error", "Failed to save expense."));
    }

    setDescription("");
    setAmount("");
    setCategory("");
  };

  // Delete expense with confirmation
  const handleDeleteExpense = (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this expense?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          axios.delete(`${API_URL}/delete/${id}`)
            .then(response => {
              Alert.alert("Deleted Successfully", response.data.message);
              const remainingExpenses = expenses.filter(exp => exp._id !== id);
              setExpenses(remainingExpenses);
              calculateTotalExpenses(remainingExpenses);
            })
            .catch(error => Alert.alert("Error", "Failed to delete expense."));
        },
        style: "destructive"
      }
    ]);
  };

  const generateReport = () => {
    const categoryTotals = expenses.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + parseFloat(item.amount);
      return acc;
    }, {});

    let reportMessage = "Expense Report:\n\n";
    Object.keys(categoryTotals).forEach(category => {
      reportMessage += `${category}: Rs. ${categoryTotals[category].toFixed(2)}\n`;
    });
    reportMessage += `\nTotal Expenses: Rs. ${totalExpenses.toFixed(2)}`;

    Alert.alert("Expense Report", reportMessage);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{editingId ? "Edit Expense" : "Add New Expense"}</Text>

      <TextInput placeholder="Description" style={styles.input} value={description} onChangeText={setDescription} />
      <TextInput placeholder="Amount" keyboardType="numeric" style={styles.input} value={amount} onChangeText={setAmount} />

      {/* Category Picker */}
      <View style={styles.pickerContainer}>
        <Picker selectedValue={category} onValueChange={setCategory} style={styles.picker}>
          <Picker.Item label="Select Category" value="Select Category" />
          <Picker.Item label="🌱Fertilizer" value="Fertilizer" />
          <Picker.Item label="🛠️Labor" value="Labor" />
          <Picker.Item label="⚙️Equipment" value="Equipment" />
        </Picker>
      </View>

      {/* Date Picker */}
      <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.dateButtonText}>Select Date: {date.toLocaleDateString()}</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker value={date} mode="date" display="spinner" onChange={onDateChange} />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSaveExpense}>
        <Text style={styles.buttonText}>{editingId ? "Update Expense" : "Save Expense"}</Text>
      </TouchableOpacity>

      <FlatList 
        data={expenses}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.expenseItem}>
            <Text style={styles.expenseText}>{item.description} {`- Rs. ${parseFloat(item.amount).toFixed(2)}`}</Text>
            <Text style={styles.expenseCategoryText}>Category: {item.category}</Text>
            <Text style={styles.expenseDateText}>Date: {new Date(item.date).toLocaleDateString()}</Text>
            <View style={styles.expenseButtons}>
              <TouchableOpacity style={styles.editButton} onPress={() => {
                setEditingId(item._id);
                setDescription(item.description);
                setAmount(item.amount);
                setCategory(item.category);
              }}>
                <Text style={styles.buttonText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteExpense(item._id)}>
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      
      {/* Total Expenses and Report Button */}
      <View style={styles.expensesRow}>
        <Text style={styles.totalExpenseText}>Total Expenses: Rs. {totalExpenses.toFixed(2)}</Text>
        <TouchableOpacity style={styles.reportButton} onPress={generateReport}>
          <Text style={styles.buttonText}>Generate Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = {
  container: { flex: 1, padding: 20, backgroundColor: "#e8f5e9" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 7, marginVertical: 5, borderRadius: 5, backgroundColor: "#fff" },
  pickerContainer: {  borderWidth: 1,borderColor: '#2e7d32',borderRadius: 10,marginBottom: 5,overflow: 'hidden', backgroundColor: '#fff',marginTop:5},
  picker: { height: 54, width: "100%" ,fontSize: 10},
  dateButton: { backgroundColor: "#ddd", padding: 8, borderRadius: 5, alignItems: "center", marginVertical: 5 },
  dateButtonText: { fontSize: 12 },
  button: { backgroundColor: "#2e7d32", padding: 14, borderRadius: 5, alignItems: "center", marginTop: 10 ,marginBottom:10},
  buttonText: { color: "#fff", fontSize:14, fontWeight: "bold" },
  reportButton: { backgroundColor: "#2e7d32", padding: 8.5, borderRadius: 20, alignItems: "center", marginBottom: 2 },
  expenseItem: { backgroundColor: "white", padding: 15, borderRadius: 8, marginVertical: 5 },
  expenseText: { fontSize: 16, fontWeight: "bold" },
  expenseCategoryText: { fontSize: 14, color: "#555" },
  expenseDateText: { fontSize: 14, color: "#777" },
  expenseButtons: { flexDirection: "row", marginTop: 10, justifyContent: 'space-between' },
  editButton: { backgroundColor: "#f5ad42", padding: 8, borderRadius: 5, marginRight: 5, color: "#000" },
  deleteButton: { backgroundColor: "#d32f2f", padding: 8, borderRadius: 5 },
  totalExpenseText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  expensesRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }
};

export default AddExpenseScreen;
