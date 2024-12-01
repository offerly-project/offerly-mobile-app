import React from "react";
import {
  Text,
  ActivityIndicator,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";


const COLORING = {
  primary:"bg-primary",
  secondary: "bg-secondary",
  success:"bg-success",
  danger:"bg-danger",
};

const SPACING = {
  small: "px-2 py-2",
  medium: "px-3 py-3",
  large: "px-4 py-4",
  xl: "px-5 py-5",
};
const LABELSIZE = {
    small: "text-sm",
    medium: "text-md",
    large: "text-lg",
    xl: "text-xl",
  };
  

  
interface ButtonProps {
  space?: "small" | "medium" | "large" | "xl";
  color?: "primary" | "secondary" | "success" | "danger";
  disabled?: boolean;
  label: string;
  labelSize?: "small" | "medium" | "large" | "xl"
  onPress?: (event: GestureResponderEvent) => void;
  loading?: boolean;
  icon?: React.ReactNode; 
  hapticFeedback?: boolean;
}


const Button: React.FC<ButtonProps> = ({
  space = "medium",
  color = "primary",
  label,
  labelSize = "medium",
  onPress,
  disabled = false,
  loading = false,
  icon,
  hapticFeedback = false,
}) => {
  const isDisabled = disabled || loading;
  const buttonStyles = `rounded-2xl ${COLORING[color]} ${isDisabled && 'opacity-40'}`;
  const labelStyles = `text-center text-text font-bold ${SPACING[space]}  ${LABELSIZE[labelSize]}`;

  const handlePress = (event: GestureResponderEvent) => {
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    if (onPress) {
      onPress(event);
    }
  };

  return (
    <TouchableOpacity
      className={buttonStyles}
      onPress={handlePress}
      disabled={isDisabled}
    >
      {loading ? (
        <ActivityIndicator className={labelStyles}  color="white" />
      ) : (
        <>
          <Text className={labelStyles}>
            {icon && icon} {label}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

export default Button;
