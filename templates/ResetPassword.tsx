import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React from "react";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import { Link } from "expo-router";
import LottieView from "lottie-react-native";

export default function ResetPassword() {
  return (
    <View className="flex-1 bg-gray-900 items-center justify-between ">
      <View className="w-4/5 rounded-3xl p-6 shadow-lg mt-auto gap-2">
        {/* Header */}
        <Text className="text-2xl font-bold text-white mb-5">
            Set new password
        </Text>

        <View className="gap-10">
          {/* New password field */}
          <View className="flex-row items-center border-b border-gray-300 pb-1">
          <MaterialCommunityIcons name="lock-outline"  className="mr-1" color="lightgray" size={22}  />
            <TextInput
              placeholder="New password"
              placeholderTextColor="#e5e7eb"
              className="flex-1 text-white"
              secureTextEntry={true}
            />
            <TouchableOpacity>
              <Feather name="eye" size={20} color="gray" />
            </TouchableOpacity>
          </View>
          {/* Confirm password field */}
          <View className="flex-row items-center border-b border-gray-300 pb-1">
          <MaterialCommunityIcons name="lock-check-outline"  className="mr-1" color="lightgray" size={22}  />
            <TextInput
              placeholder="Confirm new password"
              placeholderTextColor="#e5e7eb"
              className="flex-1 text-white"
              secureTextEntry={true}
            />
            <TouchableOpacity>
              <Feather name="eye" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Reset password button */}
        <TouchableOpacity className="bg-blue-500 mt-6 rounded-full py-4">
          <Link href="/" className="text-center text-white font-semibold">
            Reset password
          </Link>
        </TouchableOpacity>
      </View>
      {/* animation */}
      <View className="w-full h-96">
        <LottieView
          source={require("../assets/animation/animation-resetPassword.json")}
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
