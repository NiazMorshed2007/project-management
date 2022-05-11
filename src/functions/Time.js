export const getTime = (type) => {
  const today = new Date();
  var options = { year: "numeric", month: "long", day: "numeric" };
  if (type === "m/d/y") {
    return today.toLocaleDateString("en-US", options).toString(); // Saturday, September 17, 2016
  } else if (type === "m/h/d/m") {
    return today.toLocaleString().toString();
  } else {
    return "";
  }
};
