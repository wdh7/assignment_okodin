const getRandomNumber = () => {
  const min = Math.ceil(0);
  const max = Math.floor(4);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = getRandomNumber;
