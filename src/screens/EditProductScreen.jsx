import React from 'react';
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import CustomButton from '../components/CustomButton';
import { moderateScale, verticalScale } from 'react-native-size-matters';

const EditProductScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required'),
    description: Yup.string().required('Description is required'),
  });

  const fetchProductDetails = async (setValues, setLoading) => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${id}`
      );
      setValues({
        title: response.data.title,
        price: response.data.price.toString(),
        description: response.data.description,
      });
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (values) => {
    try {
      await axios.put(`https://fakestoreapi.com/products/${id}`, {
        title: values.title,
        price: parseFloat(values.price),
        description: values.description,
      });
      Alert.alert(
        'Success',
        'Product updated successfully! (Note: Changes are not persisted on the server)'
      );
      navigation.goBack();
    } catch (error) {
      console.error('Error updating product:', error);
      Alert.alert('Error', 'Failed to update product');
    }
  };

  return (
    <Formik
      initialValues={{ title: '', price: '', description: '' }}
      validationSchema={validationSchema}
      onSubmit={handleUpdate}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
        setValues,
      }) => {
        const [loading, setLoading] = React.useState(true);

        React.useEffect(() => {
          fetchProductDetails(setValues, setLoading);
        }, []);

        if (loading) {
          return (
            <ActivityIndicator
              size='large'
              color='#0000ff'
              style={styles.loader}
            />
          );
        }

        return (
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

            <CustomButton title='Update Product' onPress={handleSubmit} />
          </View>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: '#fff',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default EditProductScreen;
