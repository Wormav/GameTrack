const getTimeText = (value : number, unit : string) => `${value} ${unit}${value === 1 ? '' : 's'}`;

export const convertTimeHowlongToTime = (time : number, detailed : boolean) => {
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

export const convertTimeToHowLongTime = (hours: number, minutes: number) => {
  const totalHours = hours + (minutes / 60);
  return totalHours;
};
