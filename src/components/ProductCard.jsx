import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';

const ProductCard = ({ product, onView, onEdit, onDelete, viewIcon }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <Text style={styles.category}>{product.category}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onView} style={styles.button}>
          <Feather name='eye' size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onEdit}
          style={[styles.button, styles.editButton]}
        >
          <FontAwesome6 name='edit' size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.button, styles.deleteButton]}
        >
          <AntDesign name='delete' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: 'green',
    marginVertical: 5,
  },
  category: {
    fontSize: 12,
    color: 'gray',
  },
  buttonContainer: {
    backgroundColor: '#E8F9FF',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    padding: 10,
    marginTop: 10,
  },
  button: {
    padding: 6,
    borderRadius: 5,
    backgroundColor: '#007bff',
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
  },
});

export default ProductCard;
