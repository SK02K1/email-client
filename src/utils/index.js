export const findMailById = (mails, mailId) => {
  return mails?.find(({ id }) => id === mailId);
};

export const getFormattedDate = (date) => {
  return new Date(date).toLocaleString('en-IN');
};

export const isMarkedAsFavorite = (favorites, mailId) => {
  return Boolean(favorites.find((id) => id === mailId));
};

export const isMailRead = (readMails, mailId) => {
  return Boolean(readMails.find((id) => id === mailId));
};

export const getFilteredMails = (emails) => {
  const { list, readMails, favorites, selectedFilter } = emails;

  if (!list) {
    return [];
  }

  switch (selectedFilter) {
    case 'Read':
      return list.filter(({ id }) => readMails.includes(id));
    case 'Unread':
      return list.filter(({ id }) => !readMails.includes(id));
    case 'Favorites':
      return list.filter(({ id }) => favorites.includes(id));
    default:
      return list;
  }
};
