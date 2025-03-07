import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../components/ProductCard';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${id}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
      Alert.alert(
        'Success',
        'Product deleted successfully! (Note: Changes are not persisted on the server)'
      );
    } catch (error) {
      console.error('Error deleting product:', error);
      Alert.alert('Error', 'Failed to delete product');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Search products...'
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('AddProduct')}
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size='large' color='#0000ff' />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard
              product={item}
              onView={() =>
                navigation.navigate('ProductDetail', { id: item.id })
              }
              onEdit={() => navigation.navigate('EditProduct', { id: item.id })}
              onDelete={() => deleteProduct(item.id)}
              viewIcon={
                <Feather name='eye' size={moderateScale(24)} color='black' />
              }
              editIcon={
                <FontAwesome6
                  name='edit'
                  size={moderateScale(24)}
                  color='white'
                />
              }
              deleteIcon={
                <AntDesign
                  name='delete'
                  size={moderateScale(24)}
                  color='black'
                />
              }
            />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(10),
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
    justifyContent: 'space-between',
  },
  searchInput: {
    height: verticalScale(40),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    backgroundColor: '#fff',
    width: '70%',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: moderateScale(10),
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductListScreen;
