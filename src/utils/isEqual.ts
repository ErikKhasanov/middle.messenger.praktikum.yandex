import isArray from './isArray';
import isObject from './isObject';

type PlainObject<T = unknown> = {
  [key: string]: T;
};

import isArrayOrObject from './isArrayOrObject';

function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  if ((isObject(lhs) && !isObject(rhs)) || (isArray(lhs) && !isArray(rhs))) {
    return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      // Здесь value и rightValue может быть только массивом или объектом
      // и TypeScript это понимает с помощью Type Guard
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

export default isEqual;
