# React Native Product Management App

## Overview

This is a **React Native** application that allows users to **add, view, edit, and delete products**. The app integrates with the **FakeStore API** to fetch and manage product data.

**Note:** The FakeStore API does not persist changes made using POST, PUT, or DELETE requests. Any modifications will not be saved on the server.

## Features

- **Product Listing**: Fetch and display products from the API.
- **Search Functionality**: Search products by title.
- **CRUD Operations**:
  - **Add Product**: Create a new product using a form with validation.
  - **Edit Product**: Update product details.
  - **Delete Product**: Remove a product from the list.
  - **View Product**: See product details.
- **Formik & Yup Validation**: Ensures proper input validation for product forms.
- **Image Upload**: Allows users to select an Image Url
- **Reusable Components**: Includes `CustomButton`, `CustomInput`, and `ProductCard` components for consistency and reusability.

## Technologies Used

- **React Native** (Expo or CLI)
- **React Navigation** for screen navigation
- **Axios** for API calls
- **Formik & Yup** for form handling and validation
- **@expo/vector-icons** for icons

## Installation & Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/mohammedsanaved/ProductApp
   cd ProductApp
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the application:
   ```sh
   npm start
   ```
4. Run on an emulator or a physical device:
   ```sh
   npm run android # For Android
   npm run ios # For iOS (Mac only)
   ```

## API Integration

This project uses the **FakeStore API** for product data.

- **Base URL**: `https://fakestoreapi.com/products`
- **Endpoints**:
  - `GET /products` - Fetch all products
  - `GET /products/{id}` - Fetch product details
  - `POST /products` - Add a product
  - `PUT /products/{id}` - Update a product
  - `DELETE /products/{id}` - Delete a product

## Folder Structure

```
react-native-poc/
│── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # App screens
│   ├── navigation/        # Navigation setup
│── App.js                 # Entry point
│── package.json           # Dependencies
│── README.md              # Documentation
```
