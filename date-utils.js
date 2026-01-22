export const DateUtils = {
  REF_DATE: new Date(1900, 0, 1),
  getElapsedDays(targetDate) {
    const diffInMs = targetDate - this.REF_DATE;
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  },
  isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  },
};
