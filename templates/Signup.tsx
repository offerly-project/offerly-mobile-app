import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";

export default function Signup() {
  return (
    <View className="flex-1 bg-gray-900 items-center justify-between ">
      <View className="w-4/5 rounded-3xl p-6 shadow-lg mt-auto">
        {/* Header */}
        <Text className="text-2xl font-bold text-center text-white mb-4">
          Create a new account.
        </Text>
        <Text className="text-center text-gray-200 text-sm mb-6">
          By signing up you are agreeing to our{" "}
          <Link href="/" className="text-blue-500 underline">
            Term and privacy policy
          </Link>
        </Text>

        {/* Login Form */}
        <View className="gap-10">
          {/* Email Field */}
          <View className="flex-row items-center border-b border-gray-300 pb-1">
            <Feather name="mail" size={20} color="#e5e7eb" className="mr-2" />
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="#e5e7eb"
              className="flex-1 text-white"
              keyboardType="email-address"
            />
          </View>

          {/* Password Field */}
          <View className="flex-row items-center border-b border-gray-300 pb-1">
            <Feather name="lock" size={20} color="lightgray" className="mr-2" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#e5e7eb"
              className="flex-1 text-white"
              secureTextEntry={true}
            />
            <TouchableOpacity>
              <Feather name="eye" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity className="bg-blue-500 mt-6 rounded-full py-4">
          <Link href="/" className="text-center text-white font-semibold">
            Sign up
          </Link>
        </TouchableOpacity>
        <View className="mt-4 ">
          <Text className="text-white text-center">
            Already have an account?{" "}
            <Link href="/" className="text-blue-500">
              Sign in
            </Link>
          </Text>
        </View>
      </View>
      <View className="w-full h-96">
        <LottieView
          source={require("../assets/images/animation-signup.json")}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "10%",
            overflow: "hidden",
          }}
          autoPlay
          loop={false}
        />
      </View>
    </View>
  );
}
