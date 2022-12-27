interface IMaxLength {
  value: string;
  maxLength: number;
  errorMessage: string;
}

export const VALIDATORS_MAP = {
  maxLength:
    ({ value, maxLength, errorMessage }) =>
    () => {
      if (value.length > maxLength) {
        return { error: true, text: errorMessage };
      }
      return true;
    },
  minLength:
    ({ value, minLength, errorMessage }) =>
    () => {
      if (value.length < minLength) {
        return { error: true, text: errorMessage };
      }
      return true;
    },
  required:
    ({ value }) =>
    () => {
      if (value.length === 0) {
        return {
          error: true,
          text: "Поле обязательно",
        };
      }
      return true;
    },
  login:
    ({ value }) =>
    () => {
      if (/^[\d]$/gm.test(value)) {
        return {
          error: true,
          text: "Логин не может состоять только из цифр",
        };
      }
      if (!/^[0-9A-z_-]+$/gm.test(value)) {
        return {
          error: true,
          text: "от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)",
        };
      }
      return true;
    },
  email:
    ({ value }) =>
    () => {
      if (!/^[0-9A-z]+@[0-9A-z]+\..+$/gm.test(value)) {
        return {
          error: true,
          text: "email невалидный",
        };
      }
      return true;
    },
  password:
    ({ value }) =>
    () => {
      if (!/[A-Z]/.test(value)) {
        return {
          error: true,
          text: "Пароль должен содержать одну заглавную букву",
        };
      }
      if (!/[0-9]]/.test(value)) {
        return {
          error: true,
          text: "Пароль должен содержать одну цифру",
        };
      }
      return true;
    },
  message:
    ({ value }) =>
    () => {},
};

export const concatValidators = (validatorsArray) => {
  let errorText;
  validatorsArray.some((validator) => {
    const result = validator();
    if (result.error) {
      errorText = result.text;
      return true;
    }
    return false;
  });
  return errorText || "";
};
