import { Ionicons } from '@expo/vector-icons';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Index() {
  const currentHour = new Date().getHours();

  const getGreeting = () => {
    if (currentHour < 12) return 'Bom Dia!';
    if (currentHour < 18) return 'Boa Tarde!';
    return 'Boa Noite!';
  };

  const getIcon = () => {
    if (currentHour < 12) return 'sunny';
    if (currentHour < 18) return 'partly-sunny';
    return 'moon';
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header com saudação */}
      <View style={styles.header}>
        <Ionicons name={getIcon()} size={64} color="#007AFF" />
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.subtext}>Bem-vindo à aplicação de Posts</Text>
      </View>

      {/* Card de informações */}
      <View style={styles.infoCard}>
        <View style={styles.cardHeader}>
          <Ionicons name="information-circle" size={24} color="#007AFF" />
          <Text style={styles.cardTitle}>Como usar</Text>
        </View>
        <Text style={styles.cardText}>
          Esta aplicação permite que você visualize posts de uma API externa.
          Use a aba "Posts" abaixo para explorar a listagem completa com
          paginação.
        </Text>
      </View>

      {/* Card de features */}
      <View style={styles.featuresCard}>
        <Text style={styles.featuresTitle}>✨ Funcionalidades</Text>

        <View style={styles.featureItem}>
          <Ionicons name="list" size={20} color="#007AFF" />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Listagem de Posts</Text>
            <Text style={styles.featureDesc}>
              Veja posts da API JSONPlaceholder
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="navigate" size={20} color="#007AFF" />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Navegação</Text>
            <Text style={styles.featureDesc}>Próxima e página anterior</Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <Ionicons name="alert-circle" size={20} color="#007AFF" />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Tratamento de Erros</Text>
            <Text style={styles.featureDesc}>
              Mensagens claras em caso de falhas
            </Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Clique na aba "Posts" para começar 👇
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
    paddingTop: 16,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
    marginBottom: 4,
  },
  subtext: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  featuresCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  featureContent: {
    marginLeft: 12,
    flex: 1,
  },
  featureTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  featureDesc: {
    fontSize: 12,
    color: '#999',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: 'rgba(0, 122, 255, 0.1)',
    borderRadius: 12,
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
});
