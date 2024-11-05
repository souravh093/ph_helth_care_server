export const pick = (query: Record<string, any>, keys: string[]) => {
  const finalObject: Record<string, any> = {};
  for (const key of keys) {
    if (query && Object.hasOwnProperty.call(query, key)) {
      finalObject[key] = query[key];
    }
  }

  return finalObject;
};
