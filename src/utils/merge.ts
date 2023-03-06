/* eslint-disable no-unused-vars */
type Indexed<T = unknown> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: any): Indexed {
  for (let p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export default merge;
