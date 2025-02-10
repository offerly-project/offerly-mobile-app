import { Component, ReactNode } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface ErrorBoundaryState {
	hasError: boolean;
	errorMessage: string;
}

interface ErrorBoundaryProps {
	children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
	state: ErrorBoundaryState = { hasError: false, errorMessage: '' };

	static getDerivedStateFromError(error: Error): ErrorBoundaryState {
		// Update state to display fallback UI
		return { hasError: true, errorMessage: error.message };
	}

	componentDidCatch(error: Error, info: { componentStack: string }) {
		// Log the error to an error reporting service
		console.error('Error caught in boundary:', error, info);
	}

	render() {
		if (this.state.hasError) {
			return (
				<View style={styles.errorContainer}>
					<Text style={styles.errorMessage}>Something went wrong:</Text>
					<Text>{this.state.errorMessage}</Text>
					<Button title='Try again' onPress={() => this.setState({ hasError: false })} />
				</View>
			);
		}

		return this.props.children;
	}
}

const styles = StyleSheet.create({
	errorContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f8d7da',
		padding: 20,
	},
	errorMessage: {
		fontSize: 18,
		color: '#721c24',
		fontWeight: 'bold',
	},
});

export default ErrorBoundary;
