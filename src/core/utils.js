export const paginate = (arr, page, size) => {
  return arr.slice(page * size, (page + 1) * size);
};

export const pagersNumber = (length, size) => {
  return Math.ceil(length / size);
};

export const validator = (data, config) => {
  const errors = {};
  const validate = (validateMethod, data, config) => {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired':
        statusValidate = !data.trim();
        break;
      case 'isEmail':
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(data);
        break;
      case 'isCapitalSymbol':
        const capitalRexExp = /[A-Z]+/g;
        statusValidate = !capitalRexExp.test(data);
        break;
      case 'isContainDigit':
        const digitRegExp = /\d+/;
        statusValidate = !digitRegExp.test(data);
        break;
      case 'min':
        statusValidate = data.length < config.value;
        break;
      default:
        break;
    }
    return statusValidate ? config.message : '';
  };

  for (const fieldName in data) {
    for (const validateMethod in config[fieldName]) {
      const error = validate(
        validateMethod,
        data[fieldName],
        config[fieldName][validateMethod]
      );
      error && !errors[fieldName] && (errors[fieldName] = error);
    }
  }

  return errors;
};
