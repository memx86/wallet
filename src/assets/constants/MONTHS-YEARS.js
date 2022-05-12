export const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const yearsGenerate = function (startYear) {
  var currentYear = new Date().getFullYear(),
    years = [];
  startYear = startYear || 1980;
  while (startYear <= currentYear) {
    years.push(startYear++);
  }
  return years;
};

export const years = yearsGenerate(2020 - 10);
