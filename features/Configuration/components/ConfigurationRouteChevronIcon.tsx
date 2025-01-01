import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Feather } from '@expo/vector-icons';
import { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';

type Props = Omit<ComponentProps<typeof Feather>, 'name'>;

const ConfigurationRouteChevronIcon = (props: Props) => {
	const theme = useThemeStyles();
	const { isRtl } = languageStore();
	const chevron = isRtl ? 'chevron-left' : 'chevron-right';
	return (
		<Feather {...props} color={props.color || theme['--primary']} name={chevron} size={19} />
	);
};

export default ConfigurationRouteChevronIcon;

const styles = StyleSheet.create({});
