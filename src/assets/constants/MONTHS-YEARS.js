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
  const currentYear = new Date().getFullYear();
  let years = [];
  startYear = startYear || 1980;

  for (let i = startYear; i < currentYear; i++) {
    years.push(i);
  }

  return years;
};

export const years = yearsGenerate(2020 - 10);
