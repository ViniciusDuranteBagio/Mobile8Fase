import { View, Switch, Text, Button } from "react-native";
import { router } from "expo-router";
import { useState } from "react";

export default function Exercicio4() {
    const [isDark, setIsDark] = useState(false);

    // Cores do tema
    const backgroundColor = isDark ? "#272757" : "#FAF0E6";
    const textColor = isDark ? "#FAF0E6" : "#272757";
    
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: backgroundColor,
                gap: 32
            }}
        >
            <View style={{
                position: 'absolute',
                top: 50,
                right: 20,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10
            }}>
                <Text style={{ fontSize: 16, color: textColor }}>
                    {isDark ? 'Escuro' : 'Claro'}
                </Text>
                <Switch
                    value={isDark}
                    onValueChange={setIsDark}
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isDark ? '#f5dd4b' : '#f4f3f4'}
                />
            </View>

            <Text style={{
                fontSize: 20,
                color: textColor
            }}>
                Tema {isDark ? 'Escuro' : 'Claro'} Ativado!
            </Text>

            <Button onPress={() => router.back()} title="Voltar"/>
        </View>
    );
}