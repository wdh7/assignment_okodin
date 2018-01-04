const createGender = (num) => {
  let gender = '';

  if (num % 2 === 0) {
    gender = 'male';
  } else {
    gender = 'female';
  }

  return gender;
};


module.exports = createGender;
