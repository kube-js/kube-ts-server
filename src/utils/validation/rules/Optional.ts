import Rule from 'rulr/Rule';
const optional = <V>(rule: Rule<V>) => (data: any) => {
  if (data === undefined) {
    return [];
  }

  return rule(data);
};

export default optional;
