import React from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomButton from '../components/CustomButton';
import axios from 'axios';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

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
      Alert.alert(
        'Success',
        'Product added successfully! (Note: Changes are not persisted on the server)'
      );

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
            placeholder='Enter product title'
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
          />
          {touched.title && errors.title && (
            <Text style={styles.error}>{errors.title}</Text>
          )}

          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter product price'
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
            placeholder='Enter product description'
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
            placeholder='Enter product category'
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
            placeholder='Enter product image URL'
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
    padding: moderateScale(20),
    backgroundColor: '#fff',
  },
  label: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginTop: verticalScale(10),
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    marginBottom: verticalScale(10),
  },
  error: {
    color: 'red',
    fontSize: moderateScale(12),
    marginBottom: verticalScale(10),
  },
});

export default AddProductScreen;
