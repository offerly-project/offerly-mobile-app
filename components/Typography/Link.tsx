import { useThemeStyles } from '@/hooks/useThemeStyles';
import { Href, useRouter } from 'expo-router';
import { ComponentProps } from 'react';
import { Pressable } from 'react-native';
import Typography from './Typography';

type Props = { to?: Href; replace?: boolean; goBack?: boolean } & ComponentProps<typeof Typography>;

const Link = ({ to, replace = false, goBack = false, ...rest }: Props) => {
	const router = useRouter();
	const theme = useThemeStyles();
	return (
		<Pressable
			onPress={() => {
				if (goBack) router.back();
				else if (to && replace) router.replace(to);
				else if (to) router.push(to);
			}}
		>
			<Typography
				color={theme['--text']}
				variant='label'
				weight='bold'
				{...rest}
				className='border-b'
				style={[rest.style, { borderBottomColor: rest.color }]}
			/>
		</Pressable>
	);
};

export default Link;
