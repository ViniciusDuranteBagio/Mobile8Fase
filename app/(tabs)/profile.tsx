import { useTrainer } from "@/contexts/TrainerContext";
import { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const { name, avatar, clan, setName, setAvatar, setClan, favorites } =
    useTrainer();
  const [editOpen, setEditOpen] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 6;

  const paginated = favorites.slice(page * pageSize, (page + 1) * pageSize);

  const clans = [
    {
      id: "aqua",
      label: "Clã Aqua",
      icon: "https://cdn-icons-png.flaticon.com/128/188/188996.png",
    },
    {
      id: "pyro",
      label: "Clã Pyro",
      icon: "https://cdn-icons-png.flaticon.com/128/188/188995.png",
    },
    {
      id: "terra",
      label: "Clã Terra",
      icon: "https://cdn-icons-png.flaticon.com/128/188/188989.png",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri:
              avatar ||
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png",
          }}
          style={styles.headerAvatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.headerName}>{name || "Treinador sem nome"}</Text>

          {clan && (
            <View style={styles.clanTag}>
              <Image
                source={{ uri: clans.find((c) => c.id === clan)?.icon }}
                style={styles.clanIcon}
              />
              <Text style={styles.clanText}>
                {clans.find((c) => c.id === clan)?.label}
              </Text>
            </View>
          )}

          <Text style={styles.headerSubtitle}>ID: 0273-91</Text>
        </View>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setEditOpen(!editOpen)}
        >
          <Text style={styles.editBtnText}>{editOpen ? "Fechar" : "Editar"}</Text>
        </TouchableOpacity>
      </View>

      {editOpen && (
        <View style={styles.editCard}>
          <Text style={styles.cardTitle}>Editar Perfil</Text>

          <Text style={styles.label}>Nome</Text>
          <TextInput
            placeholder="Digite o nome"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Text style={styles.label}>Avatar (URL)</Text>
          <TextInput
            placeholder="Link da imagem"
            value={avatar}
            onChangeText={setAvatar}
            style={styles.input}
          />

          <Text style={[styles.label, { marginTop: 15 }]}>Escolher Clã</Text>

          <View style={styles.clanRow}>
            {clans.map((c) => (
              <TouchableOpacity
                key={c.id}
                onPress={() => setClan(c.id)}
                style={[
                  styles.clanOption,
                  clan === c.id && styles.clanSelected,
                ]}
              >
                <Image source={{ uri: c.icon }} style={styles.clanOptionIcon} />
                <Text style={styles.clanOptionText}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}

      <Text style={styles.collectionTitle}>Coleção do Treinador</Text>

      <View style={styles.collectionBox}>
        {paginated.length === 0 ? (
          <Text style={styles.empty}>Nenhum Pokémon capturado ainda.</Text>
        ) : (
          <FlatList
            data={paginated}
            numColumns={3}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => (
              <View style={styles.pokeCard}>
                <Image
                  source={{ uri: item.sprites.front_default }}
                  style={styles.pokeImg}
                />
                <Text style={styles.pokeName}>{item.name}</Text>
              </View>
            )}
          />
        )}
      </View>

      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setPage((p) => Math.max(0, p - 1))}
          disabled={page === 0}
          style={[styles.pageBtn, page === 0 && styles.disabled]}
        >
          <Text style={styles.pageArrow}>Página Anterior</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const maxPage = Math.floor(favorites.length / pageSize);
            if (page < maxPage) setPage(page + 1);
          }}
          disabled={(page + 1) * pageSize >= favorites.length}
          style={[
            styles.pageBtn,
            (page + 1) * pageSize >= favorites.length && styles.disabled,
          ]}
        >
          <Text style={styles.pageArrow}>Próxima Página</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F4F7FE",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 15,
    borderWidth: 2,
    borderColor: "#006eff75",
    marginBottom: 20,
    marginTop: 20,
  },
  headerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: "#006eff75",
    marginRight: 15,
  },
  headerName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#304E9A",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#6C7BA2",
    marginTop: 3,
  },
  editBtn: {
    backgroundColor: "#304E9A",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  editBtnText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  clanTag: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  clanIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  clanText: {
    color: "#304E9A",
    fontWeight: "600",
  },

  editCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#006eff75",
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#304E9A",
    textAlign: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "600",
    color: "#304E9A",
    marginTop: 10,
  },
  input: {
    backgroundColor: "#F5F7FF",
    borderWidth: 2,
    borderColor: "#006eff75",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    marginTop: 5,
  },

  clanRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  clanOption: {
    width: "32%",
    backgroundColor: "#F4F6FF",
    borderWidth: 2,
    borderColor: "#304E9A",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  clanSelected: {
    backgroundColor: "#DDE8FF",
    borderColor: "#1A4ACF",
  },
  clanOptionIcon: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  clanOptionText: {
    fontSize: 12,
    textAlign: "center",
    color: "#304E9A",
    fontWeight: "600",
  },

  collectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#304E9A",
    marginBottom: 10,
    textAlign: "center",
  },
  collectionBox: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#006eff75",
    marginBottom: 20,
    padding: 5,
    minHeight: 200,
  },
  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },
  pokeCard: {
    flexGrow: 1,
    flexBasis: "30%",
    backgroundColor: "#F4F6FF",
    borderRadius: 12,
    borderWidth: 2,
    margin: 5,
    borderColor: "#304E9A",
    alignItems: "center",
  },

  pokeImg: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  pokeName: {
    textTransform: "capitalize",
    fontWeight: "600",
    color: "#304E9A",
    marginTop: 4,
  },

  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  pageBtn: {
    padding: 12,
    backgroundColor: "#304E9A",
    borderRadius: 10,
  },
  disabled: {
    opacity: 0.4,
  },
  pageArrow: {
    color: "#FFF",
    fontSize: 16,
  },
  pageText: {
    color: "#304E9A",
    fontSize: 18,
    marginHorizontal: 12,
  },
});
