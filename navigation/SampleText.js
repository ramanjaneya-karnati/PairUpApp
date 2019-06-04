import React from 'react';

import {StyleSheet, Text} from 'react-native';

import {ChildrenArray} from 'react';

const SampleText = ({children}: { children?: ChildrenArray<*> }) => (
  <Text style={styles.sampleText}>{children}</Text>
);

export default SampleText;

const styles = StyleSheet.create({
  sampleText: {
    margin: 14,
  },
});
