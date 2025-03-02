import { useThemeContext } from '@/contexts/ThemeContext';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import * as SystemUI from 'expo-system-ui';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';

type Props = {
	children: React.ReactNode;
};

const SystemUi = ({ children }: Props) => {
	const theme = useThemeContext().theme;
	const themeStyles = useThemeStyles();
	useEffect(() => {
		SystemUI.setBackgroundColorAsync(themeStyles['--background']);
	}, [theme]);
	return children;
};

export default SystemUi;

const styles = StyleSheet.create({});
