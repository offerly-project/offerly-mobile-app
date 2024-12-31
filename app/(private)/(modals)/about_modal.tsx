import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import ModalLayout from '@/layouts/ModalLayout';
import { ScrollView, StyleSheet } from 'react-native';

type Props = {};

const AboutModal = (props: Props) => {
	const theme = useThemeStyles();
	return (
		<ModalLayout title='About us'>
			<ScrollView className='flex-1 py-2 px-6'>
				<Typography variant='body' color={theme['--text-3']}>
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
		</ModalLayout>
	);
};

export default AboutModal;

const styles = StyleSheet.create({});
