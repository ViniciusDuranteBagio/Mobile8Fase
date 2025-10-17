import { Link } from "expo-router";
import { ThemedText } from "./themed-text";

export function ButtonAbout() {
  return (
    <Link href={"../about"}>
      <Link.Trigger>
        <ThemedText type="subtitle">
          Aqui também te leva para o sobre
        </ThemedText>
      </Link.Trigger>
    </Link>
  );
}
