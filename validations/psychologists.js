const { ObjectId } = require('mongoose').Types;

const errorResHelper = (errorDescription, res, errCode = 400) => {
  res.status(errCode).json({ message: errorDescription });
};

const availabilityObjectModel = {
  monday: {
    availability: '',
    from: '',
    to: '',
  },
  tuesday: {
    availability: '',
    from: '',
    to: '',
  },
  wednesday: {
    availability: '',
    from: '',
    to: '',
  },
  thursday: {
    availability: '',
    from: '',
    to: '',
  },
  friday: {
    availability: '',
    from: '',
    to: '',
  },
  saturday: {
    availability: '',
    from: '',
    to: '',
  },
  sunday: {
    availability: '',
    from: '',
    to: '',
  },
};

const availabilityObjectValidator = (object) => {
  const keys = Object.keys(availabilityObjectModel);
  for (let key = 0; key < keys.length; key += 1) {
    if (!object[keys[key]] || typeof object[keys[key]].availability !== 'boolean') return false;
    if (
      (object[keys[key]].from !== '' || object[keys[key]].to !== '')
      && (!object[keys[key]].from.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
      || !object[keys[key]].to.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/))
    ) {
      return false;
    }
  }
  return true;
};

const availabilityObjectUpdateValidator = (object) => {
  const keys = Object.keys(availabilityObjectModel);
  for (let key = 0; key < keys.length; key += 1) {
    if (!object[keys[key]] || typeof object[keys[key]].availability !== 'boolean') return false;
    if (
      (object[keys[key]].from !== '' || object[keys[key]].to !== '')
      && (!object[keys[key]].from.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/)
      || !object[keys[key]].to.match(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/))
    ) {
      return false;
    }
  }
  return true;
};

const validateIdFormat = (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)) {
    return errorResHelper(`The psychologist 'Id' (${req.params.id}) given is invalid`, res);
  }
  return next();
};

const validatePsychologists = (req, res, next) => {
  const invalidBodyAttrs = [];
  if (typeof req.body.firstName !== 'string') {
    invalidBodyAttrs.push("'firstName'");
  }
  if (typeof req.body.lastName !== 'string') {
    invalidBodyAttrs.push("'lastName'");
  }
  if (!availabilityObjectUpdateValidator(req.body.availability)) {
    invalidBodyAttrs.push("'availability'");
  }
  if (typeof req.body.username !== 'string') {
    invalidBodyAttrs.push("'username'");
  }
  if (typeof req.body.password !== 'string') {
    invalidBodyAttrs.push("'password'");
  }
  if (typeof req.body.email !== 'string') {
    invalidBodyAttrs.push("'email'");
  }
  if (req.body.phone && typeof req.body.phone !== 'number') {
    invalidBodyAttrs.push("'phone'");
  }
  if (req.body.address && typeof req.body.address !== 'string') {
    invalidBodyAttrs.push("'address'");
  }
  if (invalidBodyAttrs.length === 1) {
    return errorResHelper(`Param ${invalidBodyAttrs[0]} is missing or invalid`, res);
  }
  if (invalidBodyAttrs.length > 1) {
    return errorResHelper(
      `Params ${invalidBodyAttrs
        .join(', ')
        .replace(/,([^,]*)$/, ' and $1')} are missing or invalid.`,
      res,
    );
  }
  return next();
};

const validatePsychologistsUsedAttr = (req, res, next) => {
  const invalidBodyAttrs = [];
  if (req.body.firstName && typeof req.body.firstName !== 'string') {
    invalidBodyAttrs.push("'firstName'");
  }
  if (req.body.lastName && typeof req.body.lastName !== 'string') {
    invalidBodyAttrs.push("'lastName'");
  }
  if (req.body.availability && !availabilityObjectValidator(req.body.availability)) {
    invalidBodyAttrs.push("'availability'");
  }
  if (req.body.username && typeof req.body.username !== 'string') {
    invalidBodyAttrs.push("'username'");
  }
  if (req.body.password && typeof req.body.password !== 'string') {
    invalidBodyAttrs.push("'password'");
  }
  if (req.body.email && typeof req.body.email !== 'string') {
    invalidBodyAttrs.push("'email'");
  }
  if (req.body.phone && typeof req.body.phone !== 'number') {
    invalidBodyAttrs.push("'phone'");
  }
  if (req.body.address && typeof req.body.address !== 'string') {
    invalidBodyAttrs.push("'address'");
  }
  if (invalidBodyAttrs.length === 1) {
    return errorResHelper(`Param ${invalidBodyAttrs[0]} is missing or invalid`, res);
  }
  if (invalidBodyAttrs.length > 1) {
    return errorResHelper(
      `Params ${invalidBodyAttrs
        .join(', ')
        .replace(/,([^,]*)$/, ' and $1')} are missing or invalid.`,
      res,
    );
  }
  return next();
};

module.exports = { validatePsychologists, validatePsychologistsUsedAttr, validateIdFormat };
