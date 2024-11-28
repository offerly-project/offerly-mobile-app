import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Feather } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";

export default function ForgetPassword() {
  return (
    <View className="flex-1 bg-gray-900 items-center justify-between ">
      <View className="w-4/5 rounded-3xl p-6 shadow-lg mt-auto gap-2">
        {/* Header */}
        <Text className="text-2xl font-bold text-white mb-1">
            Forgot password
        </Text>
        <Text className="text-gray-200 text-sm mb-6">
            We will share a password reset link to your Email-address
        </Text>

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
        </View>

        {/* Login Button */}
        <TouchableOpacity className="bg-blue-500 mt-6 rounded-full py-4">
          <Link href="/" className="text-center text-white font-semibold">
            Send link
          </Link>
        </TouchableOpacity>
        <View className="mt-4 ">
          <Text className="text-white text-center">
            Try enter your password?{" "}
            <Link href="/" className="text-blue-500">
            Sign in
            </Link>
          </Text>
        </View>
      </View>
      <View className="w-full h-96">
        <LottieView
          source={require("../assets/animation/animation-forgetPassword.json")}
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
