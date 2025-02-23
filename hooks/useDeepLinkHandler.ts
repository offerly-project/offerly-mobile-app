import * as Linking from 'expo-linking';
import { useEffect } from 'react';

export type DeepLinkHandler = (parsed: Linking.ParsedURL) => void;

type Params = {
	handler: DeepLinkHandler;
};

export const useDeepLinkHandler = ({ handler }: Params) => {
	const url = Linking.useLinkingURL();

	useEffect(() => {
		if (url) {
			handler(Linking.parse(url));
		}
	}, [url]);
};
