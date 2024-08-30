export const formatPrice = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      currencyDisplay: "narrowSymbol",
    }).format(amount);
  };
  
  export const formatRating = (rating) => {
    return Number(rating).toFixed(1);
  };
  
  export const getInstallments = (price, number) => {
    const monthPrice = price / number;
    return `${number} x ${formatPrice(monthPrice)} sin interés`;
  };
  