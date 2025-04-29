import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const EXPENSES_API_URL = "http://192.168.103.92:5000/api/expenses";
const BUDGET_API_URL    = "http://192.168.103.92:5000/api/budget";

export default function FinancialDashboard({ navigation }) {
  const [expenses, setExpenses]         = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [totalBudget, setTotalBudget]     = useState(0);
  const currentBalance = totalBudget - totalExpenses;

  useEffect(() => {
    navigation.setOptions({
      title: 'Financial Management',
      headerStyle: { backgroundColor: '#2e7d32' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' },
    });
  }, [navigation]);

  const fetchExpenses = useCallback(async () => {
    try {
      const { data } = await axios.get(EXPENSES_API_URL);
      setExpenses(data);
      const sum = data.reduce((acc, exp) => acc + parseFloat(exp.amount), 0);
      setTotalExpenses(sum);
    } catch (err) {
      console.error('Error fetching expenses:', err);
    }
  }, []);

  const fetchBudget = useCallback(async () => {
    try {
      const { data } = await axios.get(BUDGET_API_URL);
      const sum = data.reduce((acc, b) => acc + parseFloat(b.amount), 0);
      setTotalBudget(sum);
    } catch (err) {
      console.error('Error fetching budget:', err);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchExpenses();
      fetchBudget();
    }, [fetchExpenses, fetchBudget])
  );

  // Build chart data for Food, Utilities, Entertainment
  const categories = ['Fertilizer', 'Labor', 'Equipment'];
  const colors = ['#1E7D32', '#FFEB3B', '#FF7043'];
  const chartData = categories.map((cat, idx) => {
    const total = expenses
      .filter(e => e.category === cat)
      .reduce((sum, e) => sum + parseFloat(e.amount), 0);
    return {
      name: cat,
      population: total,
      color: colors[idx],
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    };
  }).filter(item => item.population > 0);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.subtitle}>Your Current Financial Snapshot</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summary}>💰 Total Income: Rs.{totalBudget.toFixed(2)}</Text>
        <Text style={styles.summary}>💸 Total Expense: Rs.{totalExpenses.toFixed(2)}</Text>
        <Text style={styles.summary}>🔥 Current Balance: Rs.{currentBalance.toFixed(2)}</Text>
      </View>

      <View style={styles.summaryContainer}>
        <View style={styles.chartContainer}>
          <Text style={styles.chartTitle}>📊 Expense Overview</Text>
          {chartData.length > 0 ? (
            <PieChart
              data={chartData}
              width={Dimensions.get('window').width - 40}
              height={220}
              chartConfig={{
                backgroundColor: '#FFFFFF',
                backgroundGradientFrom: '#F1F1F1',
                backgroundGradientTo: '#F1F1F1',
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="20"
            />
          ) : (
            <Text style={styles.noDataText}>No expense data in these categories.</Text>
          )}
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
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  noDataText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 5,
  },
  button: {
    backgroundColor: '#2e7d32',
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
