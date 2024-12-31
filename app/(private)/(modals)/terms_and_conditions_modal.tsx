import Typography from '@/components/Typography/Typography';
import { ThemeStyle } from '@/constants/themes';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import ModalLayout from '@/layouts/ModalLayout';
import { ScrollView, View } from 'react-native';

type SectionProps = {
	title: string;
	children: React.ReactNode;
};

const sections = (theme: ThemeStyle): SectionProps[] => [
	{
		title: 'Introduction',
		children: (
			<Typography variant='body' color={theme['--text-2']}>
				Welcome to Offerly! These Terms and Conditions govern your use of our mobile
				application. By accessing or using Offerly, you agree to comply with and be bound by
				these terms.
			</Typography>
		),
	},
	{
		title: 'Definitions',
		children: (
			<View>
				<Typography>
					<Typography variant='body' weight='bold' color={theme['--text-1']}>
						{'"'}
						{'App'}
						{'"'}
					</Typography>{' '}
					<Typography color={theme['--text-2']} variant='body'>
						refers to Offerly.
					</Typography>
				</Typography>
				<Typography>
					<Typography variant='body' weight='bold' color={theme['--text-1']}>
						{'"'}
						{'User'}
						{'"'}
					</Typography>{' '}
					<Typography color={theme['--text-2']} variant='body'>
						refers to anyone who uses the App.
					</Typography>
				</Typography>
				<Typography>
					<Typography variant='body' weight='bold' color={theme['--text-1']}>
						{'"'}We,{'"'} {'"'}us,{'"'} and {'"'}our{'"'}
					</Typography>{' '}
					<Typography color={theme['--text-2']} variant='body'>
						refers to the Offerly team.
					</Typography>
				</Typography>
			</View>
		),
	},
	{
		title: 'Use of the App',
		children: (
			<Typography variant='body' color={theme['--text-2']}>
				Users agree to use the app only for lawful purposes and in a way that does not
				infringe the rights of others.
			</Typography>
		),
	},
	{
		title: 'Account Registration',
		children: (
			<View>
				<Typography variant='body' color={theme['--text-2']}>
					Users will need to create an account to access certain features.
				</Typography>
				<Typography variant='body' color={theme['--text-2']}>
					Users are responsible for maintaining the confidentiality of their account
					information.
				</Typography>
			</View>
		),
	},
	{
		title: 'Offers and Promotions',
		children: (
			<View>
				<Typography variant='body' color={theme['--text-2']}>
					The app provides access to offers and promotions from various banks.
				</Typography>
				<Typography variant='body' color={theme['--text-2']}>
					We do not guarantee the accuracy or availability of any offer.
				</Typography>
			</View>
		),
	},
	{
		title: 'Prohibited Conduct',
		children: (
			<View>
				<Typography variant='body' color={theme['--text-2']}>
					Users must not misuse the app, including but not limited to hacking, spamming,
					or violating any laws.
				</Typography>
				<Typography variant='body' color={theme['--text-2']}>
					Users must not use the app to distribute harmful or illegal content.
				</Typography>
			</View>
		),
	},
	{
		title: 'Intellectual Property',
		children: (
			<View>
				<Typography variant='body' color={theme['--text-2']}>
					All content on the app, including text, graphics, logos, and software, is the
					property of Offerly or its licensors.
				</Typography>
				<Typography variant='body' color={theme['--text-2']}>
					Users may not reproduce, distribute, or create derivative works from the app
					content without our permission.
				</Typography>
			</View>
		),
	},
	{
		title: 'Termination',
		children: (
			<View>
				<Typography variant='body' color={theme['--text-2']}>
					We reserve the right to terminate or suspend access to the app for any user who
					violates these terms.
				</Typography>
				<Typography variant='body' color={theme['--text-2']}>
					Users can terminate their account at any time.
				</Typography>
			</View>
		),
	},
	{
		title: 'Limitation of Liability',
		children: (
			<View>
				<Typography variant='body' color={theme['--text-2']}>
					Offerly is provided {'"'}as is{'"'} without warranties of any kind.
				</Typography>
				<Typography variant='body' color={theme['--text-2']}>
					We are not liable for any damages arising from the use or inability to use the
					app.
				</Typography>
			</View>
		),
	},
	{
		title: 'Changes to Terms',
		children: (
			<View>
				<Typography variant='body' color={theme['--text-2']}>
					We may update these terms from time to time. Users will be notified of any
					significant changes.
				</Typography>
				<Typography variant='body' color={theme['--text-2']}>
					Continued use of the app after changes are made constitutes acceptance of the
					new terms.
				</Typography>
			</View>
		),
	},
	{
		title: 'Contact Us',
		children: (
			<Typography variant='body' color={theme['--text-2']}>
				If you have any questions about these terms, please contact us using contacy us form
			</Typography>
		),
	},
];

type Props = {};

const TermsAndConditionsModal = (props: Props) => {
	const theme = useThemeStyles();

	return (
		<ModalLayout>
			<ScrollView className='px-6 mb-20'>
				<Typography className='my-4' variant='h3' color={theme['--primary-1']}>
					Terms & Conditions
				</Typography>
				{sections(theme).map((section, index) => (
					<View key={index} className='mt-6'>
						<Typography variant='h3' weight='bold' color={theme['--primary-1']}>
							{index + 1}. {section.title}
						</Typography>
						{section.children}
					</View>
				))}
			</ScrollView>
		</ModalLayout>
	);
};

export default TermsAndConditionsModal;
