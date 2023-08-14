export const convertTimeHowlongToTimeDetails = (time : number) => {
  let remainingTime = time;

  const years = Math.floor(remainingTime / (365 * 24));
  remainingTime -= years * 365 * 24;

  const months = Math.floor(remainingTime / (30 * 24));
  remainingTime -= months * 30 * 24;

  const days = Math.floor(remainingTime / 24);
  remainingTime -= days * 24;

  const hours = Math.floor(remainingTime);
  const minutes = Math.round((remainingTime - hours) * 60);

  const yearText = years === 1 ? 'an' : 'ans';
  const monthText = months === 1 ? 'mois' : 'mois';
  const dayText = days === 1 ? 'jour' : 'jours';
  const hourText = hours === 1 ? 'heure' : 'heures';
  const minuteText = minutes === 1 ? 'minute' : 'minutes';

  const timeComponents = [];
  if (years > 0) timeComponents.push(`${years} ${yearText}`);
  if (months > 0) timeComponents.push(`${months} ${monthText}`);
  if (days > 0) timeComponents.push(`${days} ${dayText}`);
  if (hours > 0) timeComponents.push(`${hours} ${hourText}`);
  if (minutes > 0) timeComponents.push(`${minutes} ${minuteText}`);

  return timeComponents.join(', ');
};

export const convertTimeHowlongToTime = (time : number) => {
  const hours = Math.floor(time);
  const minutes = Math.round((time - hours) * 60);

  const hourText = hours === 1 ? 'heure' : 'heures';
  const minuteText = minutes === 1 ? 'minute' : 'minutes';

  if (hours > 0 && minutes > 0) {
    return `${hours} ${hourText} ${minutes} ${minuteText}`;
  } if (hours > 0) {
    return `${hours} ${hourText}`;
  } if (minutes > 0) {
    return `${minutes} ${minuteText}`;
  }

  return '';
};

export const convertTimeToHowLongTime = (hours: number, minutes: number) => {
  const totalHours = hours + (minutes / 60);
  return totalHours;
};
