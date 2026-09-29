import { TrackType } from '@/sharedTypes/sharedTypes';

export function getUniqueValuesByKey(
  arr: TrackType[] | undefined,
  key: keyof TrackType,
): string[] {
  const uniqValues = new Set<string>();

  arr?.forEach((item) => {
    const value = item[key];

    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (typeof v === 'string' && v) {
          uniqValues.add(v);
        }
      });
    } else if (typeof value === 'string') {
      uniqValues.add(value);
    }
  });

  return Array.from(uniqValues);
}
export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;
  return `${minutes}:${outputSeconds}`;
}

export const getTimePanel = (
  currentTime: number,
  totalTime: number | undefined,
) => {
  if (totalTime) {
    return `${formatTime(currentTime)} / ${formatTime(totalTime)}`;
  }
};


