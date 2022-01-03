/* eslint-disable max-len */
const mongoose = require('mongoose');

const isNotEmpty = (req, res, next) => {
  if (!req.body.firstName) {
    return res.status(400).json({ msg: 'First Name is required' });
  }
  if (!req.body.lastName) {
    return res.status(400).json({ msg: 'Last Name is required' });
  }
  if (!req.body.phone) {
    return res.status(400).json({ msg: 'Phone is required' });
  }
  if (!req.body.address.street) {
    return res.status(400).json({ msg: 'Full address is required' });
  }
  if (!req.body.address.number) {
    return res.status(400).json({ msg: 'Full address is required' });
  }
  if (!req.body.city) {
    return res.status(400).json({ msg: 'City is required' });
  }
  if (!req.body.province) {
    return res.status(400).json({ msg: 'Province is required' });
  }
  if (!req.body.country) {
    return res.status(400).json({ msg: 'Country is required' });
  }
  if (!req.body.postalCode) {
    return res.status(400).json({ msg: 'PostalCode is required' });
  }
  if (!req.body.birthday) {
    return res.status(400).json({ msg: 'Birthday is required' });
  }
  return next();
};

const validateFormat = (req, res, next) => {
  if (req.params.id && !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ msg: 'Invalid id' });
  }
  return next();
};

const validateLength = (req, res, next) => {
  if (req.body.firstName
    && (req.body.firstName.length < 2
    || req.body.firstName.length > 40)) {
    return res.status(400).json({ msg: 'First Name must be between 2 and 40 characters' });
  }
  if (req.body.lastName
    && (req.body.lastName.length < 2
    || req.body.lastName.length > 40)) {
    return res.status(400).json({ msg: 'Last Name must be between 2 and 40 characters' });
  }
  if (req.body.email
    && (req.body.email.length < 5
    || req.body.email.length > 40)) {
    return res.status(400).json({ msg: 'Email must be between 5 and 40 characters' });
  }
  if (req.body.password
    && (req.body.password.length < 8
    || req.body.password.length > 16)) {
    return res.status(400).json({ msg: 'Password  must be between 8 and 16 characters' });
  }
  if (req.body.address
    && (req.body.address.street.length < 3
    || req.body.address.street.length > 40)) {
    return res.status(400).json({ msg: 'Street address must be between 3 and 40 characters' });
  }
  if (req.body.city
    && (req.body.city.length < 3
    || req.body.city.length > 40)) {
    return res.status(400).json({ msg: 'City  must be between 3 and 40 characters' });
  }
  if (req.body.province
    && (req.body.province.length < 3
    || req.body.province.length > 40)) {
    return res.status(400).json({ msg: 'Province must be between 3 and 40 characters' });
  }
  if (req.body.country
    && (req.body.country.length < 3
    || req.body.country.length > 40)) {
    return res.status(400).json({ msg: 'Country must be between 3 and 40 characters' });
  }
  if (req.body.birthday && req.body.birthday.length !== 10) {
    return res.status(400).json({ msg: 'Birthday must have 10 characters' });
  }
  return next();
};

const validateTimeRange = (req, res, next) => {
  const { timeRange } = req.body;
  if (timeRange?.mon && validateTime(timeRange?.mon?.startTime, timeRange?.mon?.endTime))
    return res.status(400).json({ msg: `TimeRange Monday: ${validateTime(timeRange.mon?.startTime, timeRange.mon?.endTime)}` });
  if (timeRange?.tue && validateTime(timeRange?.tue?.startTime, timeRange?.tue?.endTime))
    return res.status(400).json({ msg: `TimeRange Tuesday: ${validateTime(timeRange.tue?.startTime, timeRange.tue?.endTime)}` });
  if (timeRange?.wed && validateTime(timeRange?.wed?.startTime, timeRange?.wed?.endTime))
    return res.status(400).json({ msg: `TimeRange Wednesday: ${validateTime(timeRange.wed?.startTime, timeRange.wed?.endTime)}` });
  if (timeRange?.thu && validateTime(timeRange?.thu?.startTime, timeRange?.thu?.endTime))
    return res.status(400).json({ msg: `TimeRange Thursday: ${validateTime(timeRange.thu?.startTime, timeRange.thu?.endTime)}` });
  if (timeRange?.fri && validateTime(timeRange?.fri?.startTime, timeRange?.fri?.endTime))
    return res.status(400).json({ msg: `TimeRange Friday: ${validateTime(timeRange.fri?.startTime, timeRange.fri?.endTime)}` });
  next();
};

module.exports = {
  isNotEmpty,
  validateFormat,
  validateLength,
  validateTimeRange,
};

// eslint-disable-next-line consistent-return
const validateTime = (startTime, endTime) => {
  if ((!startTime && endTime) || (startTime && !endTime)) return 'Must complete the both fields';
  if (startTime % 1 !== 0) return 'Since hour must be a whole number';
  if (endTime % 1 !== 0) return 'Until hour must be a whole number';
  if (startTime > 23 || startTime < 0) return 'Since Hour must be between 0 and 23';
  if (endTime > 24 || endTime < 1) return 'Until Hour must be between 1 and 24';
  if (startTime >= endTime) return 'End must to be later than Start';
};
