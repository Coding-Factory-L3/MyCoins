// Import React and any necessary modules

export function formatPrice(price: number, currentLocation: any) {
  if (!price || typeof price !== 'number') {
    // Handle the case when price is not a valid number
    return '';
  }

  if (!currentLocation || (!currentLocation.country && !currentLocation.code)) {
    // Handle the case when currentLocation is undefined or missing properties
    return price.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  }

  const currencyCode = currentLocation.code
    ? currentLocation.code.toUpperCase()
    : 'USD';

  return price.toLocaleString(
    currentLocation.country === 'US' ? 'en-US' : 'fr-FR',
    {
      style: 'currency',
      currency: currencyCode,
    },
  );
}

interface ExchangeRates {
  [currency: string]: number;
}

export function convertCurrency(
  amount: number,
  fromCurrency: string,
  toCurrency: string,
  exchangeRates: ExchangeRates,
  currentLocation: any,
): string | undefined {
  // Check if the currencies are valid
  if (!exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
    console.error('Invalid currency codes');
    return undefined;
  }

  // Convert the amount to the base currency (USD in this example)
  const amountInUSD = amount / exchangeRates[fromCurrency];

  // Convert the amount from USD to the target currency
  const convertedAmount = amountInUSD * exchangeRates[toCurrency];

  const currencyCode = currentLocation?.code
    ? currentLocation?.code?.toUpperCase()
    : 'USD';

  // Round to two decimal places (adjust as needed)
  return (Math.round(convertedAmount * 100) / 100)?.toLocaleString(
    currentLocation?.country === 'US' ? 'en-US' : 'fr-FR',
    {
      style: 'currency',
      currency: currencyCode,
    },
  );
}

// Example usage:
export const exchangeRates: ExchangeRates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  CAD: 1.25,
  AUD: 1.3,
  JPY: 110,
  CNY: 6.5,
  RUB: 75,
  INR: 75,
  BRL: 5.5,
  MXN: 20,
  ZAR: 15,
  NGN: 400,
  KES: 110,
  GHS: 6,
};
