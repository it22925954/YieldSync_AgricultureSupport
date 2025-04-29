import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

const UpdateExpenseScreen = ({ route, navigation }) => {
  const { expenseId } = route.params;

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);



  const handleUpdateExpense = async () => {
    if (!description || !amount || !category) {
      Alert.alert('Error', 'Please fill all fields.');
      return;
    }

    try {
      await axios.put(`http://192.168.103.92:5000/api/expenses/update/${expenseId}`, {
        description,
        amount: parseFloat(amount),
        category,
        date: date.toISOString().split('T')[0],
      });

      Alert.alert('Success', 'Expense updated successfully!');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating expense:', error);
      Alert.alert('Error', 'Failed to update expense.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Edit Expense</Text>

      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Amount"
        value={amount}
        keyboardType="numeric"
        onChangeText={setAmount}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <TextInput
        placeholder="Category"
        value={category}
        onChangeText={setCategory}
        style={{ borderBottomWidth: 1, marginBottom: 10 }}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <Text style={{ marginBottom: 10 }}>📅 {date.toDateString()}</Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity
        onPress={handleUpdateExpense}
        style={{ backgroundColor: 'blue', padding: 10, borderRadius: 5, alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>Update Expense</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UpdateExpenseScreen;
