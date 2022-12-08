export function getTimeOfMessage(date) {
  const time = new Date(date);
  let hours = time.getHours();
  let minutes = time.getMinutes();

  let timeWithPmAm = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if ((hours < 10 && hours > 0) || (hours > 12 && hours < 22)) {
    timeWithPmAm = timeWithPmAm.slice(1);
  }

  return timeWithPmAm;
}

export function getDate(date) {
  const months = [
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
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dateObj = {
    dayOfWeek: new Date(date).getDay(),
    dayNumber: 0,
    month: 0,
    year: 0,
  };

  date.split("/").forEach((num, idx) => {
    switch (idx) {
      case 0:
        dateObj["month"] = Number(num) - 1;
        break;
      case 1:
        dateObj["dayNumber"] = Number(num);
        break;
      case 2:
        dateObj["year"] = Number(num);
        break;
      default:
        break;
    }
  });

  let ordinal;

  switch (dateObj["dayNumber"]) {
    case String(dateObj["dayNumber"])[
      String(dateObj["dayNumber"]).length - 1
    ] === 1:
      ordinal = "st";
      break;
    case String(dateObj["dayNumber"])[
      String(dateObj["dayNumber"]).length - 1
    ] === 2:
      ordinal = "nd";
      break;
    case String(dateObj["dayNumber"])[
      String(dateObj["dayNumber"]).length - 1
    ] === 3:
      ordinal = "rd";
      break;
    default:
      ordinal = "th";
  }

  let year =
    new Date().getFullYear() === dateObj["year"] ? "" : `, ${dateObj["year"]}`;
  let weekDay = year === "" ? `${days[dateObj["dayOfWeek"]]}, ` : "";

  return `${weekDay}${months[dateObj["month"]]} ${
    dateObj["dayNumber"]
  }${ordinal}${year}`;
}
