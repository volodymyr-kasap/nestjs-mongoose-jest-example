import { Transform } from 'class-transformer';


const trimValue = (value: string | null | undefined) => {
  if (value === null || value === undefined) {
    return;
  }
  if (typeof value === 'string') {
    return value.trim();
  }
  return;
};

export const TrimString = () => {
  const toPlain = Transform(
    ({ value }) => {
      return value;
    },
    {
      toPlainOnly: true,
    },
  );
  const toClass = (target: Record<string, never>, key: string) => {
    return Transform(
      ({ obj }) => {
        return trimValue(obj[key]);
      },
      {
        toClassOnly: true,
      },
    )(target, key);
  };

  return function (target: unknown, key: string) {
    toPlain(target, key);
    toClass(target as Record<string, never>, key);
  };
};
