import React, { useState } from "react";
import { nanoid } from "nanoid";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  LinearLayout,
  TouchableOpacity,
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

export default function App() {
  // 원래있던 todos를 새로운 todos로
  const [todos, setTodos] = useState([]);
  // input셋팅
  const [text, setText] = useState("");

  // 카테고리 변경
  const [category, setCategory] = useState("js"); // js, react, ct
  // 새로넣을 todo
  const newTodo = {
    id: Date.now(),
    category,
    text,
    isDone: false,
    isEdit: false,
  };
  // addTodo
  const addTodo = () => {
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  };
  console.log(category);
  // setDone
  const setDone = (id) => {
    const newTodos = [...todos];
    const findIndx = newTodos.findIndex((item) => item.id === id);
    newTodos[findIndx].isDone = !newTodos[findIndx].isDone;
    console.log(newTodos);
    setTodos(newTodos);
  };

  return (
    <View contentContainerStyle={{ flexGrow: 1 }} style={styles.safeArea}>
      <View style={styles.appContainer}>
        <View style={styles.categoryContainer}>
          <TouchableOpacity
            style={{
              ...styles.categoryItemBox,
              backgroundColor: category === "js" ? "blue" : "lightblue",
            }}
            onPress={() => setCategory("js")}
          >
            <Text style={styles.categoryItem}>Javascript</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCategory("react")}
            style={{
              ...styles.categoryItemBox,
              backgroundColor: category === "react" ? "blue" : "lightblue",
            }}
          >
            <Text style={styles.categoryItem}>React</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setCategory("ct")}
            style={{
              ...styles.categoryItemBox,
              backgroundColor: category === "ct" ? "blue" : "lightblue",
            }}
          >
            <Text style={styles.categoryItem}>Coding Test</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line}></View>
        <View style={styles.inputContainer}>
          <TextInput
            value={text}
            onSubmitEditing={addTodo}
            onChangeText={setText}
            style={styles.textInput}
            placeholder="Enter your task"
          />
        </View>
        <View style={styles.line}></View>

        <View style={styles.listContainer}>
          {todos.map((item) => {
            if (item.category === category) {
              return (
                <View key={item.id} style={styles.listBox}>
                  <Text
                    style={{
                      textDecorationLine:
                        item.isDone === true ? "line-through" : "none",
                      fontSize: 20,
                    }}
                  >
                    {item.text}
                  </Text>
                  <View style={styles.checkItem}>
                    <TouchableOpacity>
                      <AntDesign
                        name="checksquare"
                        size={24}
                        color="black"
                        onPress={() => {
                          setDone(item.id);
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <FontAwesome
                        name="pencil-square-o"
                        size={24}
                        color="black"
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons name="trash-outline" size={24} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  appContainer: {
    alignItems: "center",
    marginTop: 70,
  },
  line: {
    backgroundColor: "black",
    width: "90%",
    height: 1,
    marginVertical: 20,
  },
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

  inputContainer: {
    flexDirection: "row",
    width: "90%",
    height: 50,
  },
  textInput: {
    width: "100%",
    borderColor: "pink",
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
  },
  listContainer: {
    width: "100%",
    backgroundColor: "blue",
  },
  listBox: {
    backgroundColor: "lightgray",
    padding: 5,
    marginBottom: 20,
    marginHorizontal: 20,
    paddingLeft: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  checkItem: {
    backgroundColor: "green",
    flexDirection: "row",
    marginRight: 10,
  },
});
