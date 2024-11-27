import { View, Text, TouchableOpacity, TextInput } from "react-native";
import React from "react";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";
import Checkbox from "expo-checkbox";
import { Feather } from "@expo/vector-icons";

export default function Login() {
  return (
    <View className="flex-1 bg-gray-900 items-center justify-between ">
      <View className="w-4/5 rounded-3xl p-6 shadow-lg mt-auto">
        {/* Header */}
        <Text className="text-2xl font-bold text-center text-white mb-4">
          Login to your account.
        </Text>
        <Text className="text-center text-gray-200 text-sm mb-6">
          By signing in you are agreeing to our{" "}
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

          {/* Remember Password & Forgot Password */}
          <View className="flex-row items-center justify-between mt-2">
            <TouchableOpacity className="flex-row items-center">
              <Checkbox
                className="mr-3 p-2"
                style={{ borderRadius: "30%" }}
                value={true}
              />
              <Text className="text-gray-200 text-sm">Remember me?</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Link href="/" className="text-blue-500 text-sm">
                Forget password
              </Link>
            </TouchableOpacity>
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity className="bg-blue-500 mt-6 rounded-full py-4">
          <Link href="/" className="text-center text-white font-semibold">
            Login
          </Link>
        </TouchableOpacity>
        <View className="mt-4 ">
          <Text className="text-white text-center">
            Don't have an account?{" "}
            <Link href="/" className="text-blue-500">
              Sign up
            </Link>
          </Text>
        </View>
      </View>

      <View className="w-full h-96">
        <LottieView
          source={require("../assets/images/animation-login.json")}
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
