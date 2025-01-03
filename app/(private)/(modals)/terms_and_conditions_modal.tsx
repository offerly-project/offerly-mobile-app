import Typography from '@/components/Typography/Typography';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import ModalLayout from '@/layouts/ModalLayout';
import { languageStore } from '@/stores';
import { processTranslationWithStyles } from '@/utils/utils';
import { ScrollView, View } from 'react-native';

type Props = {};

const TermsAndConditionsModal = (props: Props) => {
	const theme = useThemeStyles();
	const { translations } = languageStore();
	return (
		<ModalLayout>
			<ScrollView className='px-6 mb-12'>
				<Typography className='my-4' variant='h3' color={theme['--primary']}>
					{translations.tabs.account.terms_and_conditions.title}
				</Typography>
				{translations.tabs.account.terms_and_conditions.terms.map((section, index) => (
					<View key={index} className='mt-6'>
						<Typography variant='h3' weight='bold' color={theme['--primary']}>
							{index + 1}. {section.title}
						</Typography>
						<Typography>
							{processTranslationWithStyles(section.discription, { weight: 'bold' })}
						</Typography>
					</View>
				))}
			</ScrollView>
		</ModalLayout>
	);
};

export default TermsAndConditionsModal;
