export const generateId = (str) => {
  return `${str.toLowerCase().replace(/ /g, "_")}`;
};
