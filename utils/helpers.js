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
    return Math.floor(Math.random() * 1000) + 100;
  },
  getCurrentYear: () => {
    const year = new Date().getFullYear();
    return year;
  },
  isEqual: (postId, uId) => {
    if(postId === uId){
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