import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FFFFFF',
		paddingHorizontal: 16,
		paddingTop: 12,
	},
	header: {
		marginBottom: 12,
	},
	input: {
		flex: 1,
		height: 44,
		borderWidth: 1,
		borderColor: '#DDD',
		borderRadius: 8,
		paddingHorizontal: 10,
		backgroundColor: '#FFF',
	},
	botao: {
		backgroundColor: '#1976D2',
		paddingHorizontal: 14,
		paddingVertical: 10,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
	},
	botaoTexto: {
		color: '#FFFFFF',
		fontWeight: '600',
	},
	centro: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textoClaro: {
		color: '#666',
		marginTop: 8,
	},
	list: {
		flex: 1,
	},
	listItem: {
		paddingVertical: 12,
		borderBottomWidth: 1,
		borderBottomColor: '#F0F0F0',
	},
	listItemTitle: {
		fontSize: 16,
		color: '#111',
	},
	scroll: {
		flex: 1,
	},
	card: {
		backgroundColor: '#FAFAFA',
		borderRadius: 10,
		padding: 14,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.08,
		shadowRadius: 4,
		elevation: 2,
		marginVertical: 8,
	},
	nome: {
		fontSize: 18,
		fontWeight: '700',
		color: '#111',
		marginBottom: 6,
	},
	localidade: {
		fontSize: 14,
		color: '#666',
	},
})

export default styles

