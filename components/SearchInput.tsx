import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { icons } from '@/constants';
import Trending from './Trending';

interface FormFieldProps {
  title: string
  value: string
  placeHolder: string
  handleChangeText: (text: string) => void
  otherStyles: string
  props: any
  keyboardType: string
}

const SearchInput = ({ title, value, handleChangeText, otherStyles, keyboardType, placeHolder, ...props }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className="border-2 border-black-200 w-full h-16 bg-black-100
          rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 mx-2 font-pregular"
        value={value}
        placeholder={placeHolder}
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
      />
      <TouchableOpacity>
        <Image
          source={icons.search}
          className="w-5 h-5 mx-2"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput;
