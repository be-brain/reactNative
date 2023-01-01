import React, { useEffect, useState } from "react";
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
  Alert,
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  // 원래있던 todos를 새로운 todos로
  const [todos, setTodos] = useState([]);
  // input셋팅
  const [text, setText] = useState("");
  // 카테고리 변경
  const [category, setCategory] = useState(""); // js, react, ct
  // 수정창 입력셋팅
  const [editText, setEditText] = useState("");
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
  // setDone
  const setDone = (id) => {
    const newTodos = [...todos];
    const findIndx = newTodos.findIndex((item) => item.id === id);
    newTodos[findIndx].isDone = !newTodos[findIndx].isDone;

    setTodos(newTodos);
  };
  // deleteTodo
  const deleteTodo = (id) => {
    Alert.alert("Alert Title", "삭제하시겠습니까?", [
      {
        text: "취소",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "삭제",
        onPress: () => {
          const newTodos = todos.filter((item) => item.id !== id);
          setTodos(newTodos);
        },
        style: "destructive",
      },
    ]);
  };
  // setEdit(수정상태로 만들기)
  const setEdit = (id) => {
    const newTodos = [...todos];
    const findIndx = newTodos.findIndex((item) => item.id === id);
    newTodos[findIndx].isEdit = !newTodos[findIndx].isEdit;
    setTodos(newTodos);
  };
  // editTodo(수정한 내용으로 update)
  const editTodo = (id) => {
    const newTodos = [...todos];
    const findIndx = newTodos.findIndex((item) => item.id === id);
    newTodos[findIndx].text = editText;
    newTodos[findIndx].isEdit = false;

    setTodos(newTodos);
    setEditText("");
  };
  // 뭔지모르겠다
  const setField = async (field) => {
    setCategory(field);
    await AsyncStorage.setItem("category", field); //데이터가 문자열이므로 stringify가 필요하지않음
  };

  // todos상태가 바뀔때마다 저장(최신todos를 AsyncStorage에 저장)
  useEffect(() => {
    const saveTodos = async () => {
      await AsyncStorage.setItem("todos", JSON.stringify(todos)); //스토리지에 저장하기전 jsondata로 변환후 "todos"라는 키값으로 저장
    };
    if (todos.length > 0) saveTodos();
  }, [todos]);
  //
  useEffect(() => {
    const getData = async () => {
      const response_todos = await AsyncStorage.getItem("todos");
      const response_category = await AsyncStorage.getItem("category");

      setTodos(JSON.parse(response_todos) ?? []); //todos는 배열이므로 parsing해준다
      setCategory(response_category ?? "js"); //??는 뭐지
    };
    getData(); //랜더링하자마자 실행
  }, []);

  return (
    <View contentContainerStyle={{ flexGrow: 1 }} style={styles.safeArea}>
      <View style={styles.appContainer}>
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
                  {item.isEdit ? (
                    <TextInput
                      value={editText}
                      onChangeText={setEditText}
                      onSubmitEditing={() => {
                        editTodo(item.id);
                      }}
                      style={{ backgroundColor: "#fff", flex: 1 }}
                    ></TextInput>
                  ) : (
                    <Text
                      style={{
                        textDecorationLine:
                          item.isDone === true ? "line-through" : "none",
                        fontSize: 20,
                      }}
                    >
                      {item.text}
                    </Text>
                  )}

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
                        onPress={() => {
                          setEdit(item.id);
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Ionicons
                        name="trash-outline"
                        size={24}
                        color="black"
                        onPress={() => {
                          deleteTodo(item.id);
                        }}
                      />
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
