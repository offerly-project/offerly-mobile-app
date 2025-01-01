import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import ModalLayout from '@/layouts/ModalLayout';
import { ScrollView, StyleSheet, View } from 'react-native';

type ListItemProps = {
	name: string;
	value: string;
};

const ListItem = ({ name, value }: ListItemProps) => {
	const theme = useThemeStyles();
	return (
		<View className='flex-column justify-between border-t-gray-200 pt-4 border-t'>
			<Typography variant='body' weight='bold' color={theme['--primary']}>
				{name}
			</Typography>
			<Typography variant='body' color={theme['--text']}>
				{value}
			</Typography>
		</View>
	);
};

type Props = {};

const AboutModal = (props: Props) => {
	const theme = useThemeStyles();

	return (
		<ModalLayout>
			<ScrollView className='px-6 mb-20'>
				<Typography className='my-4' variant='h3' color={theme['--primary']}>
					About Us
				</Typography>
				<Typography variant='body' color={theme['--text']}>
					Welcome to{' '}
					<Typography color={theme['--primary']} weight='bold'>
						Offerly
					</Typography>{' '}
					– your one-stop solution for accessing the best payment card offers from various
					banks, all in one place.
				</Typography>
				<Typography className='mt-4' variant='body' color={theme['--text']}>
					At Offerly, we understand that managing payment card offers can be overwhelming.
					That{"'"}s why we{"'"}ve created a user-friendly platform that brings together
					the latest and greatest offers from a wide range of banks.
				</Typography>
				<Typography className='my-4' variant='h3' color={theme['--primary']}>
					Our Goal
				</Typography>
				<Typography variant='body' color={theme['--text']}>
					By consolidating offers from different banks into one convenient app, we save
					you time and effort, allowing you to focus on what matters most – enjoying the
					benefits of your payment cards.
				</Typography>
				<View className='my-4'>
					<ListItem
						name={'Comprehensive Coverage'}
						value={'Access offers from multiple banks without switching between apps.'}
					/>
					<ListItem
						name={'User-Friendly Interface'}
						value={'Navigate through offers effortlessly with our intuitive design.'}
					/>
					<ListItem
						name={'Up-to-Date Information'}
						value={'Stay informed with the latest deals and promotions.'}
					/>
					<ListItem
						name={'Personalized Experience'}
						value={'Receive recommendations tailored to your preferences.'}
					/>
				</View>
			</ScrollView>
		</ModalLayout>
	);
};

export default AboutModal;

const styles = StyleSheet.create({});
