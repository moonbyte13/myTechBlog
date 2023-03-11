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
  // this is not working as intended
  hoursAndDaysFromToday: (dateStr, timeStr) => {
    const dateTime = new Date(`${ dateStr }T${ timeStr }:00`);

    // Calculate the difference in milliseconds between the input date and time and the current date and time
    const diffMs = dateTime.getTime() - Date.now();

    // Calculate the difference in hours and days using the difference in milliseconds
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60)); // converted to milliseconds per hour
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)); // converted to milliseconds per day

    // Handle invalid date and time input
    if (isNaN(dateTime)) {
      return 'Invalid date and time';
    }

    // Return appropriate string based on how long ago the input date and time was
    if (diffDays === 0 && diffHours === 0) {
      return 'Just now';
    } else if (diffDays === 0 && diffHours > -1 && diffHours <= 0) {
      return '1 hour ago';
    } else if (diffDays === 0) {
      return `${ Math.abs(diffHours) } hours ago`;
    } else if (diffDays === -1) {
      return 'Yesterday';
    } else if (diffDays >= -6) {
      return `${ Math.abs(diffDays) } days ago`;
    } else if (diffDays >= -365) {
      return `${ Math.floor(Math.abs(diffDays) / 7) } weeks ago`;
    } else {
      return `${ Math.floor(Math.abs(diffDays) / 365) } years ago`;
    }
  },
  formatTimeFull: (createdAt) => {
    const date = new Date(createdAt);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    return `${ hours }:${ minutes }`;
  },
  formatDayFull: (createdAt) => {
    const date = new Date(createdAt);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${ year }-${ month }-${ day }`;
  }
};