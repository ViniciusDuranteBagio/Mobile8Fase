// Suprimir avisos específicos do React Native Web
const originalWarn = console.warn;

console.warn = function (...args) {
  const message = args[0];
  
  // Suprimir avisos específicos que não podemos corrigir diretamente
  if (
    typeof message === 'string' && (
      message.includes('props.pointerEvents is deprecated') ||
      message.includes('"shadow*" style props are deprecated')
    )
  ) {
    return;
  }
  
  // Mostrar outros avisos normalmente
  originalWarn.apply(console, args);
};

// Suprimir erros de source map específicos
const originalError = console.error;

console.error = function (...args) {
  const message = args[0];
  
  if (
    typeof message === 'string' && 
    message.includes('ENOENT: no such file or directory, open') &&
    message.includes('<anonymous>')
  ) {
    return;
  }
  
  // Mostrar outros erros normalmente
  originalError.apply(console, args);
};