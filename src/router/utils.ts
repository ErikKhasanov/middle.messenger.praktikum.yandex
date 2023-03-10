export const comparePath = (routerPath: string, path: string) => {
  const lpath = routerPath.split('/');
  const rpath = path.split('/');

  if (lpath.length !== rpath.length) {
    return false;
  }

  return lpath.every((piece, index) => {
    if (piece.startsWith(':')) {
      return true;
    }
    return piece === rpath[index];
  });
};

export const getVariablesFromPath = (routerPath: string, path: string) => {
  const params: { [key: string]: string } = {};
  const rHash = routerPath.split('/');
  const pName = path.split('/');
  rHash.forEach((item, index) => {
    if (!item.startsWith(':')) {
      return;
    }

    const variableName = item.substring(1);
    const variableValue = pName[index];
    params[variableName] = variableValue;
  });
  return params;
};
