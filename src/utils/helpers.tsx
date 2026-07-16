import { TrackType } from '@/sharedTypes/sharedTypes';

export function getUniqueValuesByKey(
  arr: TrackType[],
  key: keyof TrackType,
): string[] {
  //Используем Set для хранения уникальных значений
  const uniqValues = new Set<string>();

  //Проходим по каждому объекту массива
  arr.forEach((item) => {
    const value = item[key];

    //Если значение - массив строк
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v) {
          uniqValues.add(v);
        }
      });
    }
    //Если значение - строка
    else if (typeof value === 'string') {
      uniqValues.add(value);
    }
  });

  //Преобразуем Set обратно в массив и возвращаем
  return Array.from(uniqValues);
}

export function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const inputSeconds = Math.floor(time % 60);
  const outputSeconds = inputSeconds < 10 ? `0${inputSeconds}` : inputSeconds;
  return `${minutes}:${outputSeconds}`;
}
