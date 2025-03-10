import { Dict } from '@surface.dev/core';

export const trimDict = (dict: Dict, trimKeys: string[]): Dict => {
  const newDict: Dict = {};

  Object.entries(dict).forEach(([key, value]) => {
    if (!trimKeys.includes(key)) {
      newDict[key] = value;
    }
  });

  return newDict;
};
