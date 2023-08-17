/** This function takes a number and a unit as a parameter and concatenates to return a string */
const getTimeText = (value : number, unit : string) => `${value} ${unit}${value === 1 ? '' : 's'}`;

/** This function takes a number and a boolean, it returns a string to indicate
 * the playing time in a text format. This text is more or less detailed depending on the boolean */
export const convertTimeHowlongToTime = (time : number, detailed : boolean) :string => {
  if (detailed) {
    const units = [
      { value: Math.floor(time / (365 * 24)), unit: 'an' },
      { value: Math.floor((time % (365 * 24)) / (30 * 24)), unit: 'moi' },
      { value: Math.floor((time % (30 * 24)) / 24), unit: 'jour' },
      { value: Math.floor(time % 24), unit: 'heure' },
      { value: Math.round((time - Math.floor(time)) * 60), unit: 'minute' },
    ];

    return units
      .filter(({ value }) => value > 0)
      .map(({ value, unit }) => getTimeText(value, unit))
      .join(' ');
  }
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);
  const timeParts = [];

  if (hours > 0) {
    timeParts.push(getTimeText(hours, 'heure'));
  }

  if (minutes > 0) {
    timeParts.push(getTimeText(minutes, 'minute'));
  }

  return timeParts.join(' ');
};

/** This function takes a number of hours and a number of minutes
 * as parameters and returns this information in decimal number of hours */
export const convertTimeToHowLongTime = (hours: number, minutes: number) : number => {
  const totalHours = hours + (minutes / 60);
  return totalHours;
};
