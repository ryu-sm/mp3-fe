export const getFullDate = (year, month) => {
  const date = [];
  const now = year !== 0 && month !== 0 ? new Date(year, month, 0).getDate() : 0;
  if (now > 0) {
    for (let i = 1; i <= now; i++) {
      if (i < 10) {
        date.push({
          label: `0${i}`,
          value: `0${i}`,
        });
      } else {
        date.push({
          label: `${i}`,
          value: `${i}`,
        });
      }
    }
  }
  return date;
};
