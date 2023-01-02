import React from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";

const Todo = ({
  item,
  setDone,
  setEdit,
  setEditText,
  editText,
  editTodo,
  deleteTodo,
}) => {
  return (
    <View key={item.id} style={styles.listBox}>
      {item.isEdit ? (
        <TextInput
          // value={editText}
          defaultValue={item.text} //기본값으로 넣어주어 수정을 눌렀을때 원글이 보이도록 한다
          onChangeText={setEditText}
          onSubmitEditing={() => {
            editTodo(item.id);
          }}
          style={{ backgroundColor: "#fff", flex: 1 }}
        ></TextInput>
      ) : (
        <Text
          style={{
            textDecorationLine: item.isDone === true ? "line-through" : "none",
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
};

export default Todo;

const styles = StyleSheet.create({
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
