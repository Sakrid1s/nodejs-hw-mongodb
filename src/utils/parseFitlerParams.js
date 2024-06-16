const parseType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

  const isType = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (isType(contactType)) return contactType;
};

const parseIsFavorite = (boolean) => {
  const isString = typeof boolean === 'string';
  if (!isString) return undefined;

  if (['true'].includes(boolean)) return true;
  if (['false'].includes(boolean)) return false;

  return undefined;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseType(contactType);
  const parsedIsFavourite = parseIsFavorite(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
