module.exports = {
  formatDate: date => {
    return `${ new Date(date).getMonth() + 1 }/${ new Date(date).getDate() }/${ new Date(
      date
    ).getFullYear() }`;
  },
  formatPlural: (word, amount) => {
    if (amount !== 1) {
      return `${ word }s`;
    }

    return word;
  },
  ranNum: () => {
    return Math.floor(Math.random() * 100) + 101;
  }
};