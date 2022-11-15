export default function getTimeOfMessage(date) {
  const time = new Date(date);
  let hours = time.getHours();
  let minutes = time.getMinutes();

  let timeWithPmAm = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (hours < 10 || hours < 22) {
    timeWithPmAm = timeWithPmAm.slice(1);
  }

  return timeWithPmAm;
}
