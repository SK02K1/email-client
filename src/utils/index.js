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
