export const convertTimeStampToDate = (date) => {
  let currentDate;

  if (date) {
    currentDate = new Date(date);
  } else {
    currentDate = new Date();
  }
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const convertTimeStampToTime = (date) => {
  let currentDate;
  if (date) {
    currentDate = new Date(date);
  } else {
    currentDate = new Date();
  }
  const hours = String(currentDate.getHours()).padStart(2, "0");
  const minutes = String(currentDate.getMinutes()).padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;
  return formattedTime;
};

export const convertDateToTimeStamp = (stamp) => {
  const dateString = stamp;
  const [year, month, day] = dateString.split("-");
  const date = new Date(`${year}-${month}-${day}`);
  const timestamp = date.getTime();
  return timestamp;
};

export const convertTimeStampToMoment = (date) => {
  let currentDate;
  if (date) {
    currentDate = new Date(date);
  } else {
    currentDate = new Date();
  }
  let month = currentDate.getMonth() + 1;
  let day = currentDate.getDate();
  let year = currentDate.getFullYear();
  if (day < 10) {
    day = "0" + day;
  }
  if (month < 10) {
    month = `0${month}`;
  }
  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
};
