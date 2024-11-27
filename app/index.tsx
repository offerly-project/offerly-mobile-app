import { Text, View } from 'react-native';
import "../global.css";
import { verifyInstallation } from 'nativewind';


export default function Home() {
  // verifyInstallation();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Hello NativeWind!
      </Text>
    </View>
  );
}
