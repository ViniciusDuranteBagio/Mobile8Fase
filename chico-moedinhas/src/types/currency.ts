/**
 * Tipos de dados relacionados à moeda
 */

export interface CurrencyData {
  [key: string]: {
    code: string;
    codein: string;
    name: string;
    high: string;
    low: string;
    var_brl: string;
    pctChange: string;
    bid: string;
    ask: string;
    timestamp: string;
    create_date: string;
  };
}

export interface Currency {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  var_brl: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export type SortOption = 'code' | 'name' | 'bid' | 'variation';
