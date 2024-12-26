import { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

interface KeyboardAvoidingLayoutProps {
	children: ReactNode;
	className?: string;
}

export default function KeyboardAvoidingLayout({
	children,
	className,
}: KeyboardAvoidingLayoutProps) {
	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			className={className}
		>
			{children}
		</KeyboardAvoidingView>
	);
}
