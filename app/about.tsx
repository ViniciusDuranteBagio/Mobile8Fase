import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

const About = () => {
  return (
    <>
      <ThemedView>
        <ThemedView>
          <ThemedText type="title">Sobre</ThemedText>
          <ThemedText>Personalize sua experiencia</ThemedText>
        </ThemedView>
        <ThemedView>
          <ThemedText>Dica: O tema é detectado</ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
};

export default About;
