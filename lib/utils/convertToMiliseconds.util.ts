export function convertToMilisecondsUtil(timeStr: string): number {
  // Если timeStr является числом, возвращаем его
  if (!isNaN(timeStr as any)) {
    return parseInt(timeStr);
  }

  let multiplier: number;

  switch (timeStr[timeStr.length - 1]) {
    case 'ms':
      multiplier = 1;
      break;
    case 's':
      multiplier = 1 * 1000;
      break;
    case 'm':
      multiplier = 60 * 1000;
      break;
    case 'h':
      multiplier = 60 * 60 * 1000;
      break;
    case 'd':
      multiplier = 24 * 60 * 60 * 1000;
      break;
    case 'M':
      multiplier = 30 * 24 * 60 * 60 * 1000;
      break;
    case 'y':
      multiplier = 365 * 24 * 60 * 60 * 1000;
      break;
    default:
      throw new Error('Invalid time string');
  }

  const num = parseInt(timeStr.slice(0, -1));

  return num * multiplier;
}
