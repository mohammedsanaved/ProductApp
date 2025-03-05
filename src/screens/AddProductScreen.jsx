import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../components/CustomButton';
import axios from 'axios';

const AddProductScreen = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required'),
    description: Yup.string().required('Description is required'),
    category: Yup.string().required('Category is required'),
    image: Yup.string()
      .url('Invalid image URL')
      .required('Image URL is required'),
  });

  const handleAddProduct = async (values, { resetForm }) => {
    try {
      const newProduct = {
        title: values.title,
        price: parseFloat(values.price),
        description: values.description,
        category: values.category,
        image: values.image,
      };

      await axios.post('https://fakestoreapi.com/products', newProduct);
      Alert.alert('Success', 'Product added successfully!');
      resetForm();
      navigation.navigate('ProductList', { newProduct });
    } catch (error) {
      console.error('Error adding product:', error);
      Alert.alert('Error', 'Failed to add product');
    }
  };

  return (
    <Formik
      initialValues={{
        title: '',
        price: '',
        description: '',
        category: '',
        image: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleAddProduct}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          <Text style={styles.label}>Title:</Text>
          <TextInput
            style={styles.input}
            value={values.title}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
          />
          {touched.title && errors.title && (
            <Text style={styles.error}>{errors.title}</Text>
          )}

          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            value={values.price}
            onChangeText={handleChange('price')}
            onBlur={handleBlur('price')}
            keyboardType='numeric'
          />
          {touched.price && errors.price && (
            <Text style={styles.error}>{errors.price}</Text>
          )}

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={styles.input}
            value={values.description}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            multiline
          />
          {touched.description && errors.description && (
            <Text style={styles.error}>{errors.description}</Text>
          )}

          <Text style={styles.label}>Category:</Text>
          <TextInput
            style={styles.input}
            value={values.category}
            onChangeText={handleChange('category')}
            onBlur={handleBlur('category')}
          />
          {touched.category && errors.category && (
            <Text style={styles.error}>{errors.category}</Text>
          )}

          <Text style={styles.label}>Image URL:</Text>
          <TextInput
            style={styles.input}
            value={values.image}
            onChangeText={handleChange('image')}
            onBlur={handleBlur('image')}
          />
          {touched.image && errors.image && (
            <Text style={styles.error}>{errors.image}</Text>
          )}

          <CustomButton onPress={handleSubmit} title='Add Product' />
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
});

export default AddProductScreen;
