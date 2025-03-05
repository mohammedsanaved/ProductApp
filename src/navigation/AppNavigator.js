import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProductListScreen from '../screens/ProductListScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import EditProductScreen from '../screens/EditProductScreen';
import AddProductScreen from '../screens/AddProductScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='ProductList'
          component={ProductListScreen}
          options={{ title: 'Products' }}
        />
        <Stack.Screen
          name='ProductDetail'
          component={ProductDetailScreen}
          options={{ title: 'Product Details' }}
        />
        <Stack.Screen
          name='AddProduct'
          component={AddProductScreen}
          options={{ title: 'Add Product' }}
        />
        <Stack.Screen
          name='EditProduct'
          component={EditProductScreen}
          options={{ title: 'Edit Product' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
