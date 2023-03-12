module.exports = {
  ranNum: () => {
    return Math.floor(Math.random() * 1000) + 100;
  },
  getCurrentYear: () => {
    const year = new Date().getFullYear();
    return year;
  },
  isEqual: (iD1, iD2) => {
    if(iD1 === iD2){
      return true;
    } else {
      return false;
    }
  },
  formatDateUTC: timestamp => {
    const date = new Date(timestamp);
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${ day }/${ month }/${ year }`;
  }
};