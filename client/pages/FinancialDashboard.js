import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import axios from 'axios';

const EXPENSES_API_URL = "http://192.168.103.92:5000/api/expenses"; // your expenses endpoint
const BUDGET_API_URL = "http://192.168.103.92:5000/api/budget"; // your budget endpoint (assumed)

export default function FinancialDashboard({ navigation }) {
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBudget, setTotalBudget] = useState(0);
  const currentBalance = totalBudget - totalExpenses;

  useEffect(() => {
    navigation.setOptions({
      title: 'Financial Management',
      headerStyle: {
        backgroundColor: '#2e7d32',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
    fetchExpenses();
    fetchBudget();
  }, [navigation]);

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(EXPENSES_API_URL);
      const expenses = response.data;
      const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      setTotalExpenses(total);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const fetchBudget = async () => {
    try {
      const response = await axios.get(BUDGET_API_URL);
      const budgetData = response.data;
      const total = budgetData.reduce((sum, budget) => sum + parseFloat(budget.amount), 0);
      setTotalBudget(total);
    } catch (error) {
      console.error('Error fetching budget:', error);
    }
  };

  const data = [
    {
      name: 'Food',
      population: 300,
      color: '#1E7D32',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Utilities',
      population: 200,
      color: '#FFEB3B',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: '⚙️Entertainment',
      population: 100,
      color: '#FF7043',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.subtitle}>Your Current Financial Snapshot</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summary}>💰 Total Budget: Rs.{totalBudget.toFixed(2)}</Text>
        <Text style={styles.summary}>💸 Total Expenses: Rs.{totalExpenses.toFixed(2)}</Text>
        <Text style={styles.summary}>🔥 Current Balance: Rs.{currentBalance.toFixed(2)}</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>📊 Current Expense Overview</Text>
          <PieChart
            data={data}
            width={350}
            height={220}
            chartConfig={{
              backgroundColor: '#FFFFFF',
              backgroundGradientFrom: '#F1F1F1',
              backgroundGradientTo: '#F1F1F1',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#fff',
              },
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="20"
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddBudgetScreen')}>
          <Text style={styles.buttonText}>Budget Planning</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddExpenseScreen')}>
          <Text style={styles.buttonText}>Add New Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FinancialReports')}>
          <Text style={styles.buttonText}>Financial Reports</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F4F8F5',
  },
  subtitle: {
    fontSize: 20,
    textAlign: 'center',
    color: '#2E7D32',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  summaryContainer: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  summary: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
    marginBottom: 5,
    fontWeight: '600',
  },
  chartContainer: {
    marginBottom: 2,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 5,
  },
  button: {
    backgroundColor: '#2E7D32',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
