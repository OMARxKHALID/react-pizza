export function formatCurrency(value) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateStr));
}

export function calcMinutesLeft(dateStr) {
  const currentTime = new Date().getTime();
  const futureTime = new Date(dateStr).getTime();
  const minutesDifference = Math.round((futureTime - currentTime) / 60000);
  return minutesDifference;
}

