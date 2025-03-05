import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ProductCard = ({ product, onView, onEdit, onDelete }) => {
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
          <Feather name='eye' size={moderateScale(24)} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onEdit}
          style={[styles.button, styles.editButton]}
        >
          <FontAwesome6 name='edit' size={moderateScale(24)} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.button, styles.deleteButton]}
        >
          <AntDesign name='delete' size={moderateScale(24)} color='white' />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginVertical: verticalScale(8),
    borderRadius: moderateScale(10),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(10),
  },
  textContainer: {
    flex: 1,
    marginLeft: moderateScale(10),
  },
  image: {
    width: scale(100),
    height: verticalScale(100),
    resizeMode: 'contain',
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  price: {
    fontSize: moderateScale(14),
    color: 'green',
    marginVertical: verticalScale(5),
  },
  category: {
    fontSize: moderateScale(12),
    color: 'gray',
  },
  buttonContainer: {
    backgroundColor: '#E8F9FF',
    borderBottomRightRadius: moderateScale(10),
    borderBottomLeftRadius: moderateScale(10),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: moderateScale(10),
    padding: moderateScale(10),
    marginTop: verticalScale(10),
  },
  button: {
    padding: moderateScale(6),
    borderRadius: moderateScale(5),
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
