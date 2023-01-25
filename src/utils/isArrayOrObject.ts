import isArray from './isArray';
import isObject from './isObject';

type PlainObject<T = unknown> = {
  [key: string]: T;
};

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isObject(value) || isArray(value);
}

export default isArrayOrObject;
