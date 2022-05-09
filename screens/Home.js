import React, {useState} from 'react';

import {StyleSheet, View, Text, Button, TextInput } from 'react-native';

import { useDispatch, useSelector, connect } from 'react-redux';

import { updateABC } from '../store/taskAction'
// import { updateABC, updateBraille, updateScore } from '../store/taskAction'

const Home = ({navigation}) => {

  const dispatch = useDispatch();

  const abcNotation = useSelector(state => state.abcNotation);

  const [value, setValue] = useState(abcNotation);

  const changeHandler = (val) => {
    setValue(val);
  };

  const submitABC = (text) => {
    dispatch(updateABC(text));
  };

  const onClick = async () => {
    submitABC(value);
    navigation.navigate("Output");
  }  

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        soundcells
      </Text>
    <TextInput 
    multiline={true}
    style={styles.input}
    value={value}
    onChangeText={(val) => { changeHandler(val); }}
    />
    <Button
    title="Render"
    accessibilityLabel="Render button"
    onPress={()=>{
      onClick();
    }}    
   style={styles.btn}    

    />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding:24,
  },
  i: {
    borderWidth: 1,
    padding:10,
  },
  input: {
    height: 150,
    borderWidth: 1,
    padding:10,
    // margin: 10,
  },  
  btn: {

  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },  
});

export default Home;