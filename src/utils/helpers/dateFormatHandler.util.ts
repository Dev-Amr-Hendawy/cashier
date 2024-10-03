export const dateFormatHandler = (date: Date, hideTime?: boolean) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-based, so +1 to make it 1-based
  const day = date.getDate();
  if (hideTime) {
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDate;
};
