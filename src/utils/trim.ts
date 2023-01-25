const trim = (string: string, rule?: string): string => {
  if (!string) return '';
  if (!rule) return string.trim();
  const concatRules = rule
    .split('')
    .map(item => `${item}`)
    .join('|');
  return string.replace(new RegExp(`${concatRules}`, 'gm'), '');
};

export default trim;
