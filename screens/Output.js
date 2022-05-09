import React, {Component, useState} from 'react';
import { StyleSheet, View, Text, Button, ScrollView, StatusBar, useColorScheme, Dimensions } from 'react-native';

import { ReactNativeSVGContext, NotoFontPack } from 'standalone-vexflow-context';
import { AbcjsVexFlowRenderer } from 'abcjs-vexflow-renderer';
const { height, width } = Dimensions.get("screen");

import {useSelector} from 'react-redux';
import { Audio } from 'expo-av';

const Output = ({navigation}) => {

  const abcText = useSelector(state => state.abcNotation);
  // let abcText = "X:1\nT:Example\nM:4/4 \nK:Bb\nBcde|\n";

  const [sound, setSound] = React.useState();

  async function playSound() {
    // console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
       require('../assets/music_playback.m4a')
    );
    setSound(sound);

    // console.log('Playing Sound');
    await sound.playAsync(); }

  React.useEffect(() => {
    return sound
      ? () => {
          // console.log('Unloading Sound');
          sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  let zoom = 50;
  let tuning = "GUITAR_STANDARD";
  // console.log("tunings ", AbcjsVexFlowRenderer.TUNINGS);

  const renderOptions = {
    xOffset: 3,
    widthFactor: 30, //10,
    lineHeight: 185,
    clefWidth: 40,
    meterWidth: 30,
    repeatWidthModifier: 35,
    dottedNotesModifier: 23,
    keySigAccidentalWidth: 20,
    tabsVisibility:true,
    staveVisibility:true,
    voltaHeight: 27,
    renderWidth: width * (50 / zoom) * 1.2,//just guessing
    tuning: AbcjsVexFlowRenderer.TUNINGS[tuning],
  };

  let context; let exception; let content;
  
  try {
    const tuneObject = AbcjsVexFlowRenderer.getTune(abcText, renderOptions);
    // console.log("tune object ", tuneObject);
 
    const lastPart = tuneObject.parts[tuneObject.parts.length - 1];
    const lastBar = lastPart.bars[lastPart.bars.length - 1];

    // 1.2, .75, .90, these numbers are all related but I don't remember how, and the math could be simplified
    const contextWidth = width * 0.90;
    const contextHeight = ((lastBar.position.y + renderOptions.lineHeight) * (zoom / 50) * 0.75) + 50;
    context = new ReactNativeSVGContext(
      NotoFontPack,
      { width: contextWidth, height: contextHeight }
    );

    const viewBoxWidth = renderOptions.renderWidth + 6;
    const viewBoxHeight = (lastBar.position.y + renderOptions.lineHeight) + 5;
    context.setViewBox(0, 0, viewBoxWidth, viewBoxHeight);

    context.svg.setAttribute('preserveAspectRatio', 'xMinYMin meet');

    AbcjsVexFlowRenderer.drawToContext(context, tuneObject);
  } catch (e) {
    exception = e;
  }

  if (!exception) {
    console.log("no error");
    content = context.render();

    // console.log("content ", content); // content is an object

  } else {
    console.log("error");
    console.log(exception);
    console.log(exception.code, exception.message);
    content = (
      <View style={styles.errorContainer}>
        <Text>Error</Text>
        <Text>
          Code:
          {exception.code}
        </Text>
        <Text>
          Message:
          {exception.message}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    {content}
    {/* <Midi notation={abcText} /> */}
    <Button title="Play Sound" onPress={playSound}/>    
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    padding:24,
  },
  errorContainer: {
    width: '80%'
  },
})

export default Output;