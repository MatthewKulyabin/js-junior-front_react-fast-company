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
        if (typeof data === 'string') {
          statusValidate = !data.trim();
        }
        if (typeof data === 'object') {
          statusValidate = !Object.keys(data).length;
        }
        if (typeof data === 'boolean') {
          statusValidate = !data;
        }
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

export const getTimeDifference = (mls) => {
  mls = +mls;
  const currentDate = new Date();
  const date = new Date(mls);
  const diffTime = Math.abs(currentDate - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60));
  if (diffDays <= 5) return ' 1 minute ago ';
  if (diffDays <= 10) return ' 5 minutes ago ';
  if (diffDays <= 30) return ' 10 minutes ago ';
  if (diffDays <= 60) return ' 30 minutes ago ';
  return ` ${new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })} `;
};
