import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import ModalLayout from '@/layouts/ModalLayout';
import { languageStore } from '@/stores';
import { processTranslationWithStyles } from '@/utils/utils';
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
	const { translations } = languageStore();

	return (
		<ModalLayout>
			<ScrollView className='px-4 mb-8'>
				<Typography
					style={{ fontWeight: '800' }}
					className='my-2'
					variant='h3'
					color={theme['--primary']}
				>
					{translations.tabs.account.about_modal.title}
				</Typography>
				<Typography variant='body' className='mb-6'>
					{processTranslationWithStyles(
						translations.tabs.account.about_modal.aboutUsDisc,
						{
							color: theme['--primary'],
							weight: 'bold',
						},
					)}
				</Typography>
				<Typography className='my-2' variant='h3' color={theme['--primary']}>
					{translations.tabs.account.about_modal.ourGoal}
				</Typography>
				<Typography variant='body' color={theme['--text']}>
					{translations.tabs.account.about_modal.ourGoalDisc}
				</Typography>
				<View className='my-4'>
					{translations.tabs.account.about_modal.perks.map((perk) => (
						<ListItem key={perk.title} name={perk.title} value={perk.discription} />
					))}
				</View>
			</ScrollView>
		</ModalLayout>
	);
};

export default AboutModal;

const styles = StyleSheet.create({});
