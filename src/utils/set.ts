/* eslint-disable no-unused-vars */
import merge from './merge';

type Indexed<T = unknown> = {
  [key in string]: T;
};

function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof path === 'string') {
    throw new Error('path must be string');
  }
  if (typeof object !== 'object') {
    return object;
  }

  const obj = path.split('.').reduceRight((prev: string, curr: string) => {
    if (prev) {
      return { [curr]: { [prev]: value } };
    }
  }) as Indexed;

  return merge(object as Indexed, obj as Indexed);
}

export default set;
