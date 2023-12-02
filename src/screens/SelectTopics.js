// SelectTopics.js

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SimpleHeader from '../components/SimpleHeader';

const topicsWithUrls = {
  array: 'https://www.geeksforgeeks.org/data-structure-gq/top-mcqs-on-array-data-structure-with-answers/',
  string: 'https://www.geeksforgeeks.org/c-language-2-gq/string-gq/',
  'linked-list': 'https://www.geeksforgeeks.org/data-structure-gq/top-mcqs-on-linked-list-data-structure-with-answers/',
  stack: 'https://www.geeksforgeeks.org/data-structure-gq/top-mcqs-on-stack-data-strcuture-with-answers/',
  queue: 'https://www.geeksforgeeks.org/data-structure-gq/top-mcqs-on-queue-data-structure-with-answers/',
  tree: 'https://www.geeksforgeeks.org/tree-22648/',
  heap: 'https://www.geeksforgeeks.org/data-structure-gq/top-mcqs-on-heap-data-strcuture-with-answers/',
  hashing: 'https://www.geeksforgeeks.org/data-structure-gq/top-mcqs-on-hash-data-strcuture-with-answers/',
  'shortest-paths-in-graph': 'https://www.geeksforgeeks.org/algorithms-gq/top-mcqs-on-shortest-paths-in-graphs-with-answers/?ref=graph_lp',
  'graph-traversals': 'https://www.geeksforgeeks.org/algorithms-gq/top-mcqs-on-graph-traversals-with-answers/?ref=graph_lp',
  graph: 'https://www.geeksforgeeks.org/data-structure-gq/top-mcqs-on-graph-data-strcuture-with-answers/?ref=graph_lp',
  'minimum-spanning-tree-mst': 'https://www.geeksforgeeks.org/algorithms-gq/top-mcqs-on-minimum-spanning-tree-mst-in-graphs-with-answers/?ref=graph_lp',
  matrix: 'https://www.geeksforgeeks.org/matrix-dsa-self-paced-quiz/',
  'np-complete-complexity': 'https://www.geeksforgeeks.org/algorithms-gq/top-mcqs-on-np-complete-complexity-with-answers/',
  backtracking: 'https://www.geeksforgeeks.org/algorithms-gq/top-mcqs-on-backtracking-algorithm-with-answers/',
  'dynamic-programming': 'https://www.geeksforgeeks.org/algorithms-gq/top-mcqs-on-dynamic-programming-with-answers/',
};

const SelectTopics = () => {
  const navigation = useNavigation();

  const handleTopicSelection = (topic) => {
    const url = topicsWithUrls[topic];
    navigation.navigate('StartQuiz', { selectedTopic: topic, topicUrl: url });
  };

  return (
    <View style={styles.container}>
     <SimpleHeader headerText="Select Quiz Topic" showBackButton={true} />

      <ScrollView style={styles.scrollContainer}>
        {Object.keys(topicsWithUrls).map((topic) => (
          <TouchableOpacity
            key={topic}
            style={styles.topicItem}
            onPress={() => handleTopicSelection(topic)}
          >
            <Text style={styles.topicText}>{capitalizeFirstLetter(topic)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollContainer: {
    width: '100%',
  },
  topicItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  topicText: {
    fontSize: 16,
    color:'black'
    // textTransform: 'capitalize', // Leave this commented if hyphens should not be capitalized
  },
});

export default SelectTopics;
