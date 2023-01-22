export const findMailById = (mails, mailId) => {
  return mails?.find(({ id }) => id === mailId);
};

export const getFormattedDate = (date) => {
  const dateObj = new Date(date);

  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'pm' : 'am';

  hours = (hours % 12).toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}${ampm}`;
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
