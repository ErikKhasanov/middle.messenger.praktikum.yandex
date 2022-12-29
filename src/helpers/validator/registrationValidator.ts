import { concatValidators, VALIDATORS_MAP } from "./validators";

//TODO Сделать возможность проверки по одному параметру
export const REGISTRATION_VALIDATOR = ({
  login,
  password,
  email,
  phone,
  firstName,
  secondName,
}: {
  [key: string]: string;
}) => ({
  login: concatValidators([
    VALIDATORS_MAP.maxLength({
      value: login,
      maxLength: 20,
      errorMessage: "Вы ввели максимальное количество символов",
    }),
    VALIDATORS_MAP.minLength({
      value: login,
      minLength: 3,
      errorMessage: "Вы ввели минимальное количество символов",
    }),
    VALIDATORS_MAP.login({
      value: login,
    }),
  ]),
  phone: concatValidators([VALIDATORS_MAP.phone({ value: phone })]),
  firstName: concatValidators([VALIDATORS_MAP.firstName({ value: firstName })]),
  secondName: concatValidators([
    VALIDATORS_MAP.secondName({ value: secondName }),
  ]),
  email: concatValidators([
    VALIDATORS_MAP.email({
      value: email,
    }),
  ]),
  password: concatValidators([
    VALIDATORS_MAP.minLength({
      value: password,
      minLength: 8,
      errorMessage: "Пароль должен содержать от 8 до 40 символов",
    }),
    VALIDATORS_MAP.maxLength({
      value: password,
      maxLength: 40,
      errorMessage: "Пароль должен содержать от 8 до 40 символов",
    }),
  ]),
});
