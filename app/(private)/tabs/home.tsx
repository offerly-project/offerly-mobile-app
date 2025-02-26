import { OffersApi } from '@/api/offers.api';
import CloseButton from '@/components/Button/CloseButton';
import GoTopLayout from '@/components/Button/GoTopButton';
import Input from '@/components/Input/Input';
import OfferSkeleton from '@/components/Skeletons/OfferSkeleton';
import Typography from '@/components/Typography/Typography';
import { IOffer } from '@/entities/offer.entity';
import BanksList from '@/features/Home/BanksList';
import RecenetlyAddedList from '@/features/Home/RecenetlyAddedList';
import TrendingOffersList from '@/features/Home/TrendingOffersList';
import OfferCard from '@/features/Offers/OfferCard';
import usePagination from '@/hooks/usePagination';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { languageStore } from '@/stores';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Skeleton } from 'moti/skeleton';
import { useEffect, useRef, useState } from 'react';
import { Modal, NativeScrollEvent, NativeSyntheticEvent, View } from 'react-native';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
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
	const { translations } = languageStore();
	const [modalVisible, setModalVisible] = useState(false);
	const flatlistRef = useRef<FlatList<IOffer>>(null);

	const slideAnim = useSharedValue(-100); // Initial position above the screen

	useEffect(() => {
		if (modalVisible) {
			slideAnim.value = withTiming(0, { duration: 300 });
		} else {
			slideAnim.value = withTiming(-100, { duration: 300 });
		}
	}, [modalVisible]);

	const slideStyle = useAnimatedStyle(() => {
		const translateY = interpolate(slideAnim.value, [-100, 0], [-100, 0], 'clamp');
		return {
			transform: [{ translateY }],
		};
	});

	const {
		loadMore,
		loadingMore,
		initialLoader,
		data: offers,
	} = usePagination<IOffer>({
		url: '/user/offers',
		getQuery: (page, limit) =>
			OffersApi.buildGetOffersQuery({
				page,
				limit,
				card: '*',
				q: search,
				sort_by: 'created_at',
				sort_direction: 'desc',
			}),
		queryDependencies: [search],
	});

	const scrollY = useSharedValue(0);

	const scrollOnChange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
		const { contentOffset } = event.nativeEvent;
		const offsetY = contentOffset.y;

		scrollY.value = withTiming(offsetY, { duration: 200, easing: Easing.out(Easing.quad) });
	};

	const headerAnimation = useAnimatedStyle(() => {
		const translateY = interpolate(scrollY.value, [0, 100], [0, -80], 'clamp');
		const opacity = interpolate(scrollY.value, [0, 100], [1, 0], 'clamp');

		return { transform: [{ translateY }], opacity };
	});

	const renderPlaceholder = () => {
		if (!offers && !initialLoader) {
			return (
				<View className='flex-1 justify-start items-center p-10'>
					<MaterialCommunityIcons
						name='emoticon-sad-outline'
						size={120}
						color={theme['--static']}
					/>
					<Typography
						weight='medium'
						align='center'
						color={theme['--static']}
						variant='body'
					>
						{translations.placeholders.homePageSearchNoDataPlaceholder}
					</Typography>
				</View>
			);
		}
		return null;
	};
	const renderSkeleton = (count: number) => (
		<Skeleton.Group show={true}>
			{new Array(count).fill(0).map((_, i) => (
				<View className='mx-4 my-2' key={i}>
					<OfferSkeleton />
				</View>
			))}
		</Skeleton.Group>
	);

	const handleModalClose = () => {
		setModalVisible(false);
		setSearch('');
	};

	return (
		<>
			<Animated.View
				className='py-2 absolute top-0 left-0 w-full bg-transparent z-20'
				style={headerAnimation}
			>
				<TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
					<Input
						pointerEvents='none'
						trailingIcon={() => (
							<Ionicons size={22} color={theme['--primary']} name='search' />
						)}
						value={search}
						// onPress={() => setModalVisible(true)}
						placeholder={translations.placeholders.homePagePlaceholder}
						variant='primary'
					/>
				</TouchableWithoutFeedback>
			</Animated.View>

			<Animated.ScrollView
				onScroll={scrollOnChange}
				scrollEventThrottle={16}
				contentContainerClassName='gap-4 last:pb-6 z-10 pt-20'
			>
				<BanksList />
				<TrendingOffersList />
				<RecenetlyAddedList />
			</Animated.ScrollView>
			<Modal
				animationType='fade'
				transparent={true}
				visible={modalVisible}
				onDismiss={handleModalClose}
			>
				<BlurView
					className='flex-1 pb-10  gap-5'
					intensity={40}
					experimentalBlurMethod='dimezisBlurView'
					blurReductionFactor={40}
					tint='dark'
				>
					<Animated.View
						className='bg-card flex-row flex-grow-0 items-center gap-3 p-5 pt-20 rounded-b-2xl'
						style={slideStyle}
					>
						<CloseButton onPress={() => setModalVisible(false)} />
						<View className='flex-1 '>
							<Input
								trailingIcon={() => (
									<Ionicons size={22} color={theme['--primary']} name='search' />
								)}
								onPress={() => setModalVisible(true)}
								value={search}
								autoFocus
								onChangeText={setSearch}
								placeholder={translations.placeholders.homePagePlaceholder}
								variant='primary'
							/>
						</View>
					</Animated.View>
					{initialLoader ? renderSkeleton(5) : renderPlaceholder()}
					{/* {!renderPlaceholder()} */}

					{
						<FlatList
							data={offers}
							contentContainerStyle={{ gap: 10, paddingInline: 10 }}
							className='flex-1'
							keyExtractor={(item) => item.id}
							renderItem={({ item }) => <OfferCard key={item.id} offer={item} />}
							ref={flatlistRef}
							ListFooterComponent={() => <>{loadingMore && renderSkeleton(2)}</>}
							onEndReached={loadMore}
							onScroll={(e) => {
								scrollY.value = e.nativeEvent.contentOffset.y;
							}}
						/>
					}

					<GoTopLayout
						style={{ bottom: 50 }}
						onPress={() => {
							flatlistRef.current?.scrollToOffset({ offset: 0 });
						}}
						scrollY={scrollY}
					/>
				</BlurView>
			</Modal>
		</>
	);
};

export default Home;
