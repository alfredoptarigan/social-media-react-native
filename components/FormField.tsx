import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { icons } from '@/constants';

interface FormFieldProps {
  title: string
  value: string
  placeHolder: string
  handleChangeText: (text: string) => void
  otherStyles: string
  props: any
  keyboardType: string
}

const FormField = ({ title, value, handleChangeText, otherStyles, keyboardType, placeHolder, ...props }: FormFieldProps) => {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View className="border-2 border-black-200 w-full h-16 bg-black-100
          rounded-2xl focus:border-secondary items-center flex-row">
        <TextInput
          className="flex-1 text-white font-psemibold text-base "
          value={value}
          placeholder={placeHolder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image className="w-6 h-6" resizeMode="contain" source={!showPassword ? icons.eye : icons.eyeHide} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default FormField;
