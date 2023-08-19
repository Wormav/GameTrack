const getTimeText = (value : number, unit : string) : string => {
/**
  * @param {number} value - time
  * @param {boolean} unit - unit of time
  * @returns {string} exemple return :
  * "1 heure"
  */

  const result = `${value} ${unit}${value === 1 ? '' : 's'}`;

  return result;
};

export const convertTimeHowlongToTime = (time : number, detailed : boolean) :string => {
  /**
  * @param {number} time - game time in howLongToBeat format
  * @param {boolean} detailed - return detailed string format
  * @returns {string} exemple return :
  * "01 heure, 30 minutes", detailled: "01 annee, 02 jours, 03 heures, 04 minutes"
  */
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

export const convertTimeToHowLongTime = (hours: number, minutes: number) : number => {
  /**
  * @param {number} hours - time hours
  * @param {number} minutes - time minutes
  * @returns {number} exemple return :
  * "4.5"
  */
  const totalHours = hours + (minutes / 60);
  return totalHours;
};
