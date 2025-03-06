import { padStart } from "lodash";

export const minutesToTime = (minutes?: number): string => {
  if (!minutes) {
    return "00:00";
  }

  const hours = Math.floor(minutes / 60);
  const remainingSeconds = minutes % 60;

  const formattedHours = padStart(hours.toString(), 2, "0");
  const formattedMinutes = padStart(remainingSeconds.toString(), 2, "0");

  return `${formattedHours} h. ${formattedMinutes} m.`;
};
