import { Tabs } from "expo-router";
import { ComponentProps } from "react";

export type ScreenOptions = ComponentProps<typeof Tabs>["screenOptions"];

export const DEFAULT_SCREEN_LAYOUT = {
	headerShown: false,
};
