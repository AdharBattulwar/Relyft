export const apiResponse = (status, success, msg) => {
  res.status(status).json(status, success, msg);
};
