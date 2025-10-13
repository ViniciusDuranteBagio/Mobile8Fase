import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function Settings() {
  return (
    <ThemedView>
      <ThemedView>
        <ThemedText type="title">Sobre</ThemedText>
        <ThemedText>Apenas uma aba de sobre o aplicativo</ThemedText>
      </ThemedView>

      <ThemedView>
        <ThemedText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi vel
          tristique libero, in consectetur risus. Ut tellus augue, semper vitae
          lorem a, tempus rhoncus justo. Maecenas accumsan mi eros, at semper
          quam faucibus at. Vestibulum in dignissim magna. Curabitur faucibus in
          nisi eget posuere. Suspendisse condimentum suscipit enim, vel eleifend
          arcu commodo quis. Suspendisse dapibus maximus ante, sed vehicula
          lacus tincidunt vitae. Morbi iaculis nulla risus, ut viverra leo
          lobortis fermentum. Suspendisse lectus orci, hendrerit eget convallis
          et, posuere ut massa. Vivamus purus lacus, lobortis vel purus vel,
          euismod ullamcorper elit.
        </ThemedText>
        <ThemedText>
          Sed pellentesque eros nulla, ac malesuada tellus feugiat quis.
          Maecenas mollis accumsan maximus. Proin tristique eu metus consequat
          blandit. Vivamus rutrum mi tortor, a feugiat lorem tristique eget.
          Nullam nec accumsan magna, in suscipit nibh. Phasellus vel posuere
          nulla. Aliquam feugiat risus nec metus maximus, eu egestas dolor
          imperdiet. Mauris vel sapien quis neque molestie vulputate vitae id
          justo. Morbi sed ex a dui lobortis laoreet. Integer vitae sodales
          mauris. Donec euismod nibh quis risus porta, quis euismod ipsum
          bibendum. Nullam rutrum nunc vel dolor finibus lobortis.
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}
