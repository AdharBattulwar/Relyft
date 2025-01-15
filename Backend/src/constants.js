export const apiResponse = (res, status, success, msg) => {
  res.status(status).json(status, success, msg);
};
