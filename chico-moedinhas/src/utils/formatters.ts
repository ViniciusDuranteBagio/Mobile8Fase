/**
 * Funções de formatação de dados
 */

/**
 * Formata um número como moeda brasileira (R$)
 * Exemplo: 5.05 → R$ 5,05
 * Exemplo: 1234.56 → R$ 1.234,56
 */
export function formatCurrency(value: string | number): string {
  try {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) {
      return 'R$ 0,00';
    }

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  } catch (error) {
    return 'R$ 0,00';
  }
}

/**
 * Formata um número com 4 casas decimais
 * Exemplo: 5.05 → 5.0500
 */
export function formatDecimal(value: string | number, decimals: number = 4): string {
  try {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) {
      return '0.00';
    }

    return num.toFixed(decimals);
  } catch (error) {
    return '0.00';
  }
}

/**
 * Formata variação percentual com cores
 * Exemplo: 1.23 → +1.23%
 * Exemplo: -0.45 → -0.45%
 */
export function formatVariation(value: string | number): string {
  try {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(num)) {
      return '0.00%';
    }

    const formatted = num.toFixed(2);
    const sign = num >= 0 ? '+' : '';
    
    return `${sign}${formatted}%`;
  } catch (error) {
    return '0.00%';
  }
}
