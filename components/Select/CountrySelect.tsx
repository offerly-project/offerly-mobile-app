import { ICountry } from '@/api/static-data.api';
import { useThemeStyles } from '@/hooks/useThemeStyles';
import { staticDataStore } from '@/stores';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import Typography from '../Typography/Typography';
import Select from './Select';

type Props = {
	value: ICountry;
	renderedValue: keyof ICountry;
	onSelect: (value: ICountry) => void;
};

const CountrySelect = ({ value, renderedValue, onSelect }: Props) => {
	const countries = staticDataStore().countries;
	const theme = useThemeStyles();
	return (
		<Select
			items={countries.map((country) => ({
				name: country.phone_code,
				value: country.name,
				data: country,
			}))}
			onChange={onSelect}
			itemRenderer={(item, _, closeHandler) => {
				return (
					<Pressable
						className={`flex-1 justify-between items-center flex-row p-4 rounded-md`}
						onPress={() => {
							onSelect(item.data);
							closeHandler();
						}}
					>
						<Typography weight='bold' color={theme['--text']}>
							{item.data.name}
						</Typography>
						<View className='flex-row gap-4 items-center'>
							<Typography color={theme['--text']}>{item.data.phone_code}</Typography>
							{item.data.name === value.name && (
								<MaterialCommunityIcons
									name='check'
									size={26}
									className='mb-2'
									color={theme['--primary']}
								/>
							)}
						</View>
					</Pressable>
				);
			}}
			value={value.name}
		>
			{() => <>{value[renderedValue]}</>}
		</Select>
	);
};

export default CountrySelect;

const styles = StyleSheet.create({});
