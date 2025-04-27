import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { PieChart } from 'react-native-chart-kit';

export default function FinancialDashboard({ navigation }) {
  // Set green header on mount
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
  }, [navigation]);

  // Sample data for pie chart (expense categories)
  const data = [
    {
      name: 'Seeds',
      population: 300,
      color: '#1E7D32',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Labor',
      population: 200,
      color: '#FFEB3B',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Equipment',
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
        <Text style={styles.summary}>💰 Total Income: Rs.3,000</Text>
        <Text style={styles.summary}>💸 Total Expenses: Rs.1,500</Text>
        <Text style={styles.summary}>🔥 Current Balance: Rs.1,500</Text>
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
