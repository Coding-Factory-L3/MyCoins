export function formatPrice(price: number, currentLocation: any) {
  if (!currentLocation?.country && !currentLocation?.code) {
    return price
      ? price.toLocaleString('en-US', {style: 'currency', currency: 'USD'})
      : '';
  }

  return price?.toLocaleString(
    currentLocation?.country === 'US' ? 'en-US' : 'fr-FR',
    {
      style: 'currency',
      currency: currentLocation?.code?.toUpperCase(),
    },
  );
}
