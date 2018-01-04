const getRandomNumber = () => {
  const min = Math.ceil(1);
  const max = Math.floor(5);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

module.exports = getRandomNumber;
