import { OffersApi } from '@/api/offers.api';
import Input from '@/components/Input/Input';
import { IOffer } from '@/entities/offer.entity';
import BanksList from '@/features/Home/BanksList';
import LastChanceList from '@/features/Home/LastChanceList';
import RecenetlyAddedList from '@/features/Home/RecenetlyAddedList';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import Animated, {
	Easing,
	interpolate,
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';

const Home = () => {
	const theme = useThemeStyles();
	const [search, setSearch] = useState('');
	const [offers, setOffers] = useState<IOffer[]>([]);
	const { translations } = languageStore();

	useEffect(() => {
		(async () => {
			const offerList = await OffersApi.searchOffers(search);
			setOffers(offerList);
		})();
	}, [search]);

	const scrollY = useSharedValue(0);

	const scrollOnChange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset } = event.nativeEvent;
		const offsetY = contentOffset.y;

		scrollY.value = withTiming(offsetY, { duration: 200, easing: Easing.out(Easing.quad) });
	};

	const headerAnimation = useAnimatedStyle(() => {
		const translateY = interpolate(scrollY.value, [0, 100], [0, -80], 'clamp');
		const opacity = interpolate(scrollY.value, [0, 100], [1, 0], 'clamp');

		return {
			transform: [{ translateY }],
			opacity,
		};
	});

	return (
		<>
			<Animated.View
				className='px-4 py-2 absolute top-0 left-0 w-full bg-background z-20'
				style={headerAnimation}
			>
				<Input
					trailingIcon={() => (
						<Ionicons size={22} color={theme['--primary']} name='search' />
					)}
					value={search}
					onChangeText={setSearch}
					placeholder={translations.placeholders.homePagePlaceholder}
					variant='primary'
				/>
			</Animated.View>

			<Animated.ScrollView
				onScroll={scrollOnChange}
				scrollEventThrottle={16}
				className='mx-3'
				contentContainerClassName='gap-4 last:pb-6 z-10 pt-20'
			>
				<BanksList />
				<LastChanceList />
				<RecenetlyAddedList />
			</Animated.ScrollView>
		</>
	);
};

export default Home;
