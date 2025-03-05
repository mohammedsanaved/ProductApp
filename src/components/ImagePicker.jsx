import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  Modal,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useField } from 'formik';
import { Ionicons } from '@expo/vector-icons';

const ImagePickerField = ({ label, name }) => {
  const [field, meta, helpers] = useField(name);
  const [showPreview, setShowPreview] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      helpers.setValue(result.assets[0].uri);
    }
  };

  return (
    <View className='mb-4'>
      {label && <Text className='text-sm font-bold mb-1'>{label}</Text>}

      <View className='flex-row items-center'>
        <TouchableOpacity
          onPress={pickImage}
          className='border border-gray-300 rounded-md px-4 py-3 flex-1'
        >
          <Text className='text-gray-500'>
            {field.value ? 'Image Selected' : 'Choose an image'}
          </Text>
        </TouchableOpacity>

        {field.value && (
          <>
            <TouchableOpacity onPress={() => setShowPreview(true)}>
              <Ionicons
                name='eye-outline'
                size={24}
                color='black'
                className='ml-3'
              />
            </TouchableOpacity>

            {/* Modal for Image Preview */}
            <Modal
              visible={showPreview}
              transparent
              animationType='fade'
              onRequestClose={() => setShowPreview(false)}
            >
              <View className='flex-1 bg-black/50 justify-center items-center'>
                <View className='bg-white p-5 rounded-lg items-center'>
                  <Image
                    source={{ uri: field.value }}
                    className='w-52 h-52 mb-4 object-contain'
                  />
                  <TouchableOpacity
                    onPress={() => setShowPreview(false)}
                    className='bg-teal-200 px-4 py-2 rounded-md'
                  >
                    <Text className='text-teal-900 font-bold'>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </>
        )}
      </View>

      {meta.touched && meta.error && (
        <Text className='text-red-500 text-xs mt-1'>{meta.error}</Text>
      )}
    </View>
  );
};

export default ImagePickerField;
