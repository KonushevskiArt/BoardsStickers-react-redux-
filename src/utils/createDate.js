const createDate = () => {
  const result = {};

  const time = new Date();
  result.hours = checkZero(time.getHours());
  result.minutes = checkZero(time.getMinutes());
  result.day = checkZero(time.getDate());
  result.month = checkZero(time.getMonth());
  result.year = time.getFullYear();

  return result;
};

const checkZero = (str) => Number(str) < 10 ? `0${str}`: str;

export {createDate};
