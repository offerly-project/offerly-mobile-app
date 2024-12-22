import { Href, useRouter } from 'expo-router';
import { ComponentProps } from 'react';
import { Pressable } from 'react-native';
import Typography from './Typography';

type Props = { to?: Href; replace?: boolean; goBack?: boolean } & ComponentProps<typeof Typography>;

const Link = ({ to, replace = false, goBack = false, ...rest }: Props) => {
	const router = useRouter();
	return (
		<Pressable
			onPress={() => {
				if (goBack) router.back();
				else if (to && replace) router.replace(to);
				else if (to) router.push(to);
			}}
		>
			<Typography
				color='#444'
				variant='label'
				weight='bold'
				{...rest}
				className='border-b border-black'
			/>
		</Pressable>
	);
};

export default Link;
