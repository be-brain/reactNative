import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const Category = ({ setField, category }) => {
  return (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        style={{
          ...styles.categoryItemBox,
          backgroundColor: category === "js" ? "blue" : "lightblue",
        }}
        onPress={() => setField("js")}
      >
        <Text style={styles.categoryItem}>Javascript</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setField("react")}
        style={{
          ...styles.categoryItemBox,
          backgroundColor: category === "react" ? "blue" : "lightblue",
        }}
      >
        <Text style={styles.categoryItem}>React</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setField("ct")}
        style={{
          ...styles.categoryItemBox,
          backgroundColor: category === "ct" ? "blue" : "lightblue",
        }}
      >
        <Text style={styles.categoryItem}>Coding Test</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  categoryItemBox: {
    width: 100,
    height: 60,
  },
  categoryItem: {
    textAlign: "center",
    lineHeight: 52,
  },
});
