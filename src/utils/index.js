export const findMailById = (mails, mailId) => {
  return mails?.find(({ id }) => id === mailId);
};

export const getFormattedDate = (date) => {
  return new Date(date).toLocaleString('en-IN');
};
