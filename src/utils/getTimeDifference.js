export const getTimeDifference = (date_future, date_now) => {
  // get total seconds between the times
  var delta = Math.abs(date_future - date_now) / 1000;

  // calculate (and subtract) whole days
  var days = Math.floor(delta / 86400);
  delta -= days * 86400;

  // calculate (and subtract) whole hours
  var hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  // calculate (and subtract) whole minutes
  var minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  // what's left is seconds
  var seconds = delta % 60; // in theory the modulus is not required

  if (days > 0) {
    return days + ((days == 1) ? ' day ago' : ' days ago');
  }
  if (hours > 0) {
    return hours + ((hours == 1) ? ' hour ago' : ' hours ago');
  }
  if (minutes > 0) {
    return minutes + ((minutes == 1) ? ' minute ago' : ' minutes ago');
  }
};
