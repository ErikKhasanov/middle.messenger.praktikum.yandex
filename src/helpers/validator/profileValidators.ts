import { concatValidators, VALIDATORS_MAP } from './validators';

// TODO Сделать возможность проверки по одному параметру
const PROFILE_VALIDATOR = ({ login, email, phone, first_name, second_name, display_name }: { [key: string]: string }) => ({
  login: concatValidators([
    VALIDATORS_MAP.maxLength({
      value: login,
      maxLength: 20,
      errorMessage: 'Вы ввели максимальное количество символов',
    }),
    VALIDATORS_MAP.minLength({
      value: login,
      minLength: 3,
      errorMessage: 'Вы ввели минимальное количество символов',
    }),
    VALIDATORS_MAP.login({
      value: login,
    }),
  ]),
  phone: concatValidators([VALIDATORS_MAP.phone({ value: phone })]),
  first_name: concatValidators([VALIDATORS_MAP.first_name({ value: first_name })]),
  second_name: concatValidators([VALIDATORS_MAP.second_name({ value: second_name })]),
  display_name: concatValidators([VALIDATORS_MAP.display_name({ value: display_name })]),
  email: concatValidators([
    VALIDATORS_MAP.email({
      value: email,
    }),
  ]),
});

export default PROFILE_VALIDATOR;
