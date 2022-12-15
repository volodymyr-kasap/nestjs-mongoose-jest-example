import { Transform } from 'class-transformer';


const valueToEnumOptional = (value) => {
  if (value === null || value === undefined || value?.length === 0) {
    return null;
  }

  return value;
};

export const ToEnumOptional = () => {
  const toPlain = Transform(
    ({ value }) => {
      return value;
    },
    {
      toPlainOnly: true,
    },
  );

  const toClass = (target: unknown, key: string) => {
    return Transform(
      ({ obj }) => {
        return valueToEnumOptional(obj[key]);
      },
      {
        toClassOnly: true,
      },
    )(target, key);
  };

  return function (target: unknown, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
};
