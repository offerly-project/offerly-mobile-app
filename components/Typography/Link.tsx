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
				{...rest}
				style={{ textDecorationLine: 'underline', textDecorationColor: rest.color }}
			/>
		</Pressable>
	);
};

export default Link;
