const addMinutes = (time, minutesToAdd) => {
  const [hours, minutes] = time.split(":").map(Number);

  const date = new Date();
  date.setHours(hours, minutes + minutesToAdd, 0, 0);

  return date.toTimeString().slice(0, 5);
};

const isBefore = (time1, time2) => {
  return time1 < time2;
};

const generateSlots = (startTime, endTime, duration = 30) => {
  const slots = [];

  let currentStart = startTime;

  while (isBefore(addMinutes(currentStart, duration), endTime) || addMinutes(currentStart, duration) === endTime) {
    const currentEnd = addMinutes(currentStart, duration);

    slots.push({
      startTime: currentStart,
      endTime: currentEnd
    });

    currentStart = currentEnd;
  }

  return slots;
};

module.exports = generateSlots;