import React, { Children } from 'react';

interface EachProps<T> {
  render: (item: T, index: number) => React.ReactNode;
  of: Array<T>;
}

export const Each = <T extends any>(props: EachProps<T>) => {
  const { of, render } = props;
  return Children.toArray(of.map((item, index) => render(item, index)));
};
