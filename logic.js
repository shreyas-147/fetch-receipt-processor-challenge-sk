const { v4: uuidv4 } = require("uuid");
const dataStore = {};

const storeData = (data) => {
  const id = uuidv4();
  let points = 0;

  //first condition
  points += data.retailer
    .split("")
    .filter((char) => /[a-zA-Z0-9]/.test(char))
    .join("").length;
  //   console.log("first condition: " + points);

  //second condition
  points += data.total - Math.floor(data.total) !== 0 ? 0 : 50;
  //   console.log("2 condition: " + points);

  //third condition
  points += data.total % 0.25 === 0 ? 25 : 0;
  //   console.log("3 condition: " + points);

  //fourth condition
  points += Math.floor(data.items.length / 2) * 5;
  //   console.log("4 condition: " + points);

  //fifth condition
  data.items.forEach((item) => {
    if (item.shortDescription.trim().length % 3 === 0) {
      points += Math.ceil(item.price * 0.2);
      //   console.log("5 condition: " + item.shortDescription + " " + points);
    }
  });

  //sixth condition
  let d = new Date(data.purchaseDate);
  points += d.getUTCDate() % 2 === 0 ? 0 : 6;
  //   console.log("6 condition: " + points);

  //seventh Condition
  let h = data.purchaseTime.split(":")[0];
  let m = data.purchaseTime.split(":")[1];
  if (Number(h) > 14 && Number(h) < 16) points += 10;
  else if (Number(h) === 14 && Number(m) > 0) points += 10;
  //   console.log("7 condition: " + points);

  dataStore[id] = points;
  return id;
};

const getDataById = (id) => {
  return dataStore[id];
};

module.exports = {
  storeData,
  getDataById,
};
