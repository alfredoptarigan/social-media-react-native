import { View, Text, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { router, Link } from 'expo-router';
import { createUser } from '@/lib/appwrite';

const SignUp = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert('Error', 'Please fill in all the fields')
    }
    setIsSubmitting(true)

    try {
      const result = await createUser(form.email, form.password, form.username)

      // Set it to global state

      router.replace('/home')
    } catch (error: any) {
      Alert.alert("Error", error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="w-full justify-center min-h-[80vh] px-4 my-6">
          <Image source={images.logo} resizeMode='contain'
            className="w-[115px] h-[35px] " />
          <Text className="text-2xl text-white text-bold mt-10 font-psemibold"> Sign up to Aora</Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(text: string) => setForm({ ...form, username: text })}
            otherStyles="mt-10"
            placeHolder='Username'
          />

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(text: string) => setForm({ ...form, email: text })}
            otherStyles="mt-7"
            keyboardType="email-address"
            placeHolder='Email'
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(text: string) => setForm({ ...form, password: text })}
            otherStyles="mt-7"
            placeHolder='Password'
          />

          <CustomButton title='Sign Up'
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="justify-center pt-5 flex-row gap-2">
            <Text className="text-gray-100 text-lg">Have an account already?</Text>
            <Link href="/sign-in" className="text-secondary text-lg text-bold"> Sign In </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp;
