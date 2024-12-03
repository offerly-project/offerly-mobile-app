import { BanksApi } from '@/api/banks.api';
import Select from '@/components/Select/Select';
import Typography from '@/components/Typography/Typography';
import { IBank } from '@/entities/bank.entity';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { formatBankType, formatUploadPath } from '@/utils/utils';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = {};

const SelectCardsModal = (props: Props) => {
	const [loading, setLoading] = useState(true);
	const [banks, setBanks] = useState<IBank[]>([]);
	const [selectedBank, setSelectedBank] = useState<string | null>(null);
	useEffect(() => {
		BanksApi.fetchBanks()
			.then((banks) => {
				setBanks(banks);
				setLoading(false);
			})
			.finally(() => {
				setLoading(false);
			});
	}, []);

	const theme = useThemeStyles();
	if (loading) return null;
	return (
		<SafeAreaView>
			<Select
				items={banks.map((bank) => ({ name: bank.name.en, value: bank.id, data: bank }))}
				onChange={(value) => setSelectedBank(value)}
				value={selectedBank}
				placeHolder='Select Bank'
				className='h-[40] w-[80%] m-auto my-4'
				itemRenderer={(item, index, closeHandler) => {
					return (
						<Pressable
							className='p-4 flex flex-row items-center gap-4 justify-between'
							onPress={() => {
								setSelectedBank(item.value);
								closeHandler();
							}}
						>
							<View className='flex flex-row gap-2 items-center justify-center'>
								<Image
									source={formatUploadPath(item.data.logo)}
									style={{ width: 45, height: 45, borderRadius: 50 }}
								/>
								<View className={'flex flex-col gap-1'}>
									<Typography variant='body' color={theme['--primary-2']}>
										{item.data.name.en}
									</Typography>
									<Typography variant='body' color={theme['--primary-3']}>
										{formatBankType(item.data.type)}
									</Typography>
								</View>
							</View>
							{item.value === selectedBank && (
								<Ionicons name='checkmark' size={16} color={theme['--primary-1']} />
							)}
						</Pressable>
					);
				}}
				searchResolver={(item, search) =>
					item.data.name.en.toLowerCase().includes(search.toLowerCase())
				}
			/>
		</SafeAreaView>
	);
};

export default SelectCardsModal;

const styles = StyleSheet.create({});
