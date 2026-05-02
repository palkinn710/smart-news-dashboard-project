export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export const titleCase = (value = "") =>
  value.charAt(0).toUpperCase() + value.slice(1);
