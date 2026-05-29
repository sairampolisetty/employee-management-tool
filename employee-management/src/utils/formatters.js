export const formatSalary = (salary) => {
  if (!salary) return '₹0';
  return '₹' + parseInt(salary).toLocaleString('en-IN');
};

export const formatDistance = (distanceInMeters) => {
  if (!distanceInMeters) return '0 m';
  const distance = parseInt(distanceInMeters);
  
  if (distance >= 1000) {
    return (distance / 1000).toFixed(2) + ' km';
  }
  return distance + ' m';
};

export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.toLocaleString('en-US', { month: 'short' });
  const year = dateObj.getFullYear();
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  
  const ampm = dateObj.getHours() >= 12 ? 'PM' : 'AM';
  const displayHours = String(dateObj.getHours() % 12 || 12).padStart(2, '0');
  
  return `${day} ${month} ${year}, ${displayHours}:${minutes} ${ampm}`;
};

export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};
