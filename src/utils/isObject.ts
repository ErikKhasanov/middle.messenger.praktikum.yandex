type PlainObject<T = unknown> = {
  [key: string]: T;
};

function isObject(value: unknown): value is PlainObject {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
}

export default isObject;
