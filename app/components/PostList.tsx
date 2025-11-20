import React from 'react';
import { FlatList, ListRenderItem, StyleSheet, Text, View } from 'react-native';
import { Post } from '../services/apiService';

interface PostListProps {
  posts: Post[];
}

const PostCard: React.FC<{ item: Post }> = ({ item }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{item.title}</Text>
    <Text style={styles.body} numberOfLines={3}>
      {item.body}
    </Text>
    <View style={styles.footer}>
      <Text style={styles.meta}>ID: {item.id}</Text>
      <Text style={styles.meta}>Usuário: {item.userId}</Text>
    </View>
  </View>
);

export const PostList: React.FC<PostListProps> = ({ posts }) => {
  const renderItem: ListRenderItem<Post> = ({ item }) => (
    <PostCard item={item} />
  );

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      scrollEnabled={false}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    paddingTop: 8,
  },
  meta: {
    fontSize: 12,
    color: '#999',
  },
  separator: {
    height: 0,
  },
});
