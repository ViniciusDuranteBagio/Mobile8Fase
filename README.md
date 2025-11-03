# 🧩 Atividade React Native — Saudação Personalizada com Modo Escuro

Este projeto foi desenvolvido como parte dos exercícios de React Native, abordando **Text**, **Image**, **TextInput**, **TouchableOpacity**, **Switch** e **condicionais com useState**.

---

## 🚀 Exercícios Implementados

### **1️⃣ Exibição de Texto e Imagem**
- Exibe o texto **"Olá, React Native!"**.
- Mostra uma imagem vinda da internet (logo do React).
- Ambos os elementos organizados lado a lado.

---

### **2️⃣ Saudação Personalizada**
- Um campo de texto (`TextInput`) permite que o usuário digite seu nome.
- Abaixo, aparece dinamicamente a saudação:
``` 
Olá, [nome digitado]!
```
- Caso o campo esteja vazio, exibe **"Olá, visitante!"**.

---

### **3️⃣ Validação de Entrada**
- Um botão **"Confirmar"** valida a entrada do nome:
- Se estiver vazio → `alert("Digite seu nome primeiro")`
- Se preenchido → `alert("Bem-vindo!")`

---

### **4️⃣ Modo Claro/Escuro (Switch)**
- Um **Switch flutuante** no canto superior direito alterna o tema:
- **Modo Claro:** Fundo branco, texto azul.
- **Modo Escuro:** Fundo preto, texto branco.
- Todo o estilo muda dinamicamente usando o estado `modoEscuro`.

---
