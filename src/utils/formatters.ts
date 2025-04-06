interface Salary {
  min: number;
  max: number;
  currency: string;
}

/**
 * Formats salary information into a human-readable string
 */
export const formatSalary = (salary: Salary | undefined): string => {
  if (!salary) return 'Salaire non communiqué';
  
  const { min, max, currency } = salary;
  const currencySymbol = currency === 'EUR' ? '€' : currency;
  
  // Format numbers with space as thousands separator
  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };
  
  if (min === max) {
    return `${formatNumber(min)} ${currencySymbol}/an`;
  }
  
  return `${formatNumber(min)} - ${formatNumber(max)} ${currencySymbol}/an`;
};