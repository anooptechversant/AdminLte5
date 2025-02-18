import classNames from 'classnames';
import React, { FC, FormHTMLAttributes } from 'react';

type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  className?: string;
};

const Form: FC<FormProps> = ({ children, className, ...rest }) => {
  return (
    <form className={classNames('w-full', className)} {...rest}>
      {children}
    </form>
  );
};

export default Form;
