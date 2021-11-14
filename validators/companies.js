function requiredCompanies(req, res, next) {
  res.locals.requirements.name = 'name';
  res.locals.requirements.address = 'address';
  res.locals.requirements.city = 'city';
  res.locals.requirements.province = 'province';
  res.locals.requirements.country = 'country';
  res.locals.requirements.zipCode = 'zipCode';
  res.locals.requirements.phone = 'phone';
  res.locals.requirements.email = 'email';
  res.locals.requirements.fullName = 'fullName';
  res.locals.requirements.contactPhone = 'contactPhone';
  return next();
}

module.exports = { requiredCompanies };
