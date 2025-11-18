import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface PokemonDetails {
	name: string;
	height: number;
	weight: number;
	sprites: {
		front_default: string;
		front_shiny: string;
	};
	types: { type: { name: string } }[];
	moves: { move: { name: string } }[];
	stats: { base_stat: number; stat: { name: string } }[];
}

export default function PokemonDetails() {
	const { name } = useLocalSearchParams();

	const [data, setData] = useState<PokemonDetails | null>(null);
	const [loading, setLoading] = useState(true);
	const [favorite, setFavorite] = useState(false);

	async function loadDetails() {
		try {
			const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
			const json = await res.json();
			setData(json);
		} catch (err) {
			console.log("Erro ao carregar detalhes:", err);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		loadDetails();
	}, []);

	if (loading || !data) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" />
				<Text>Carregando detalhes...</Text>
			</View>
		);
	}

	return (
		<ScrollView contentContainerStyle={styles.screen}>
			<View style={styles.card}>

				<TouchableOpacity
					style={styles.star}
					onPress={() => setFavorite(!favorite)}
				>
					<Text style={{ fontSize: 32 }}>
						{favorite ? "⭐" : "☆"}
					</Text>
				</TouchableOpacity>

				<Text style={styles.title}>{data.name}</Text>

				<View style={styles.spriteContainer}>
					<Image
						style={styles.image}
						source={{ uri: data.sprites.front_default }}
					/>
					<Image
						style={styles.image}
						source={{ uri: data.sprites.front_shiny }}
					/>
				</View>

				<View style={styles.infoBox}>
					<Text style={styles.info}>Altura: {data.height}</Text>
					<Text style={styles.info}>Peso: {data.weight}</Text>
					<Text style={styles.info}>
						Tipos: {data.types.map(t => t.type.name).join(", ")}
					</Text>
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Status Base</Text>
					{data.stats.map((s, i) => (
						<Text key={i} style={styles.info}>
							{s.stat.name}: {s.base_stat}
						</Text>
					))}
				</View>

				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Ataques</Text>

					{data.moves.slice(0, 5).map((m, i) => (
						<Text key={i} style={styles.info}>
							• {m.move.name}
						</Text>
					))}

					{data.moves.length > 5 && (
						<Text style={styles.more}>+ {data.moves.length - 5} ataques...</Text>
					)}
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 20,
		alignItems: "center",
		backgroundColor: "#F2F7FF",
	},
	card: {
		width: "100%",
		backgroundColor: "#fff",
		borderRadius: 18,
		paddingVertical: 25,
		paddingHorizontal: 20,

		...Platform.select({
			ios: {
				shadowColor: "#000",
				shadowOpacity: 0.15,
				shadowRadius: 10,
				shadowOffset: { width: 0, height: 5 }
			},
			android: {
				elevation: 6
			},
			web: {
				boxShadow: "0 4px 18px rgba(0,0,0,0.15)"
			}
		})
	},
	star: {
		position: "absolute",
		right: 15,
		top: 15,
		zIndex: 1,
	},
	spriteContainer: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 40,
		marginBottom: 10,
	},
	image: {
		width: 130,
		height: 130,
	},
	title: {
		fontSize: 30,
		textTransform: "capitalize",
		fontWeight: "700",
		textAlign: "center",
		marginVertical: 12,
	},
	infoBox: {
		width: "100%",
		backgroundColor: "#EEF4FF",
		padding: 15,
		borderRadius: 12,
		marginBottom: 15,
	},
	info: {
		fontSize: 18,
		marginBottom: 4,
		color: "#333",
	},
	section: {
		marginTop: 15,
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 8,
		borderBottomWidth: 2,
		borderBottomColor: "#cbd5ff",
		paddingBottom: 4,
	},
	more: {
		fontSize: 16,
		color: "#555",
		marginTop: 4,
	},
	center: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});
