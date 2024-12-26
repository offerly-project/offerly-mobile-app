import CloseButton from '@/components/Button/CloseButton';
import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { router } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

type Props = {};

const about = (props: Props) => {
	const theme = useThemeStyles();
	return (
		<SafeAreaView className='flex-1'>
			<View className='flex-row items-center justify-center p-4'>
				<Typography variant='h3' color={theme['--primary-1']}>
					About us
				</Typography>
				<CloseButton
					className='absolute right-11'
					onPress={() => {
						router.back();
					}}
				/>
			</View>
			<ScrollView className='flex-1 py-2 px-6'>
				<Typography variant='body' color={theme['--text-2']}>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac orci nec
					libero eleifend vestibulum. Suspendisse potenti. Nullam in libero nec velit
					ultricies aliquet. Nullam euismod, purus nec luctus tincidunt, mi velit
					ultricies purus, in fermentum nunc nisl at purus. Nullam nec nunc nec libero
					ultrices lacinia. Nullam nec nunc nec libero ultrices lacinia. Nullam nec nunc
					nec libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
					orci nec libero eleifend vestibulum. Suspendisse potenti. Nullam in libero nec
					velit ultricies aliquet. Nullam euismod, purus nec luctus tincidunt, mi velit
					ultricies purus, in fermentum nunc nisl at purus. Nullam nec nunc nec libero
					ultrices lacinia. Nullam nec nunc nec libero ultrices lacinia. Nullam nec nunc
					nec libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
					orci nec libero eleifend vestibulum. Suspendisse potenti. Nullam in libero nec
					velit ultricies aliquet. Nullam euismod, purus nec luctus tincidunt, mi velit
					ultricies purus, in fermentum nunc nisl at purus. Nullam nec nunc nec libero
					ultrices lacinia. Nullam nec nunc nec libero ultrices lacinia. Nullam nec nunc
					nec libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
					orci nec libero eleifend vestibulum. Suspendisse potenti. Nullam in libero nec
					velit ultricies aliquet. Nullam euismod, purus nec luctus tincidunt, mi velit
					ultricies purus, in fermentum nunc nisl at purus. Nullam nec nunc nec libero
					ultrices lacinia. Nullam nec nunc nec libero ultrices lacinia. Nullam nec nunc
					nec libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
					orci nec libero eleifend vestibulum. Suspendisse potenti. Nullam in libero nec
					velit ultricies aliquet. Nullam euismod, purus nec luctus tincidunt, mi velit
					ultricies purus, in fermentum nunc nisl at purus. Nullam nec nunc nec libero
					ultrices lacinia. Nullam nec nunc nec libero ultrices lacinia. Nullam nec nunc
					nec libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
					orci nec libero eleifend vestibulum. Suspendisse potenti. Nullam in libero nec
					velit ultricies aliquet. Nullam euismod, purus nec luctus tincidunt, mi velit
					ultricies purus, in fermentum nunc nisl at purus. Nullam nec nunc nec libero
					ultrices lacinia. Nullam nec nunc nec libero ultrices lacinia. Nullam nec nunc
					nec libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
					orci nec libero eleifend vestibulum. Suspendisse potenti. Nullam in libero nec
					velit ultricies aliquet. Nullam euismod, purus nec luctus tincidunt, mi velit
					ultricies purus, in fermentum nunc nisl at purus. Nullam nec nunc nec libero
					ultrices lacinia. Nullam nec nunc nec libero ultrices lacinia. Nullam nec nunc
					nec libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
					orci nec libero eleifend vestibulum. Suspendisse potenti. Nullam in libero nec
					velit ultricies aliquet. Nullam euismod, purus nec luctus tincidunt, mi velit
					ultricies purus, in fermentum nunc nisl at purus. Nullam nec nunc nec libero
					ultrices lacinia. Nullam nec nunc nec libero ultrices lacinia. Nullam nec nunc
					nec libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
					orci nec libero eleifend vestibulum. Suspendisse potenti. Nullam in libero nec
					velit ultricies aliquet. Nullam euismod, purus nec luctus tincidunt, mi velit
					ultricies purus, in fermentum nunc nisl at purus. Nullam nec nunc nec libero
					ultrices lacinia. Nullam nec nunc nec libero ultrices lacinia. Nullam nec nunc
					nec libero Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ac
					orci nec libero eleifend vestibulum. Suspendisse potenti. Nullam in libero nec
					velit ultricies aliquet. Nullam euismod, purus nec luctus tincidunt, mi velit
					ultricies purus, in fermentum nunc nisl at purus. Nullam nec nunc nec libero
					ultrices lacinia. Nullam nec nunc nec libero ultrices lacinia. Nullam nec nunc
					nec libero
				</Typography>
			</ScrollView>
		</SafeAreaView>
	);
};

export default about;

const styles = StyleSheet.create({});
