export const calculateIsClosed = (deadline) => {
  if (!deadline) return false;
  const endOfDay = new Date(deadline);
  endOfDay.setHours(23, 59, 59, 999);
  return new Date() > endOfDay;
};
