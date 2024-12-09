import { Href, useRouter } from 'expo-router';
import { ComponentProps } from 'react';
import { Pressable } from 'react-native';
import Typography from './Typography';

type Props = { to: Href } & ComponentProps<typeof Typography>;

const Link = ({ to, ...rest }: Props) => {
	const router = useRouter();
	return (
		<Pressable
			onPress={() => {
				router.push(to);
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
