import React from "react";

export const withExtraPropsHoc = <P extends object, T extends object>(
  Component: React.FC<P>,
  extraProps: T
): React.FC<Omit<P, keyof T>> => {
  return (props: Omit<P, keyof T>) => {
    return <Component {...(props as P)} {...extraProps} />;
  };
};
