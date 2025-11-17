import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function Profile() {
	return (
		<ThemedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ThemedText type="title">Salve, treinador!</ThemedText>
			<ThemedText style={{ marginTop: 10 }}>
				Esse é o seu perfil no aplicativo.
			</ThemedText>
		</ThemedView>
	);
}