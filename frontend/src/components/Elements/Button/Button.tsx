import React, { ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant?: 'primary' | 'black';
  style?: 'solid' | 'outline' | 'white';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  isFullWidth?: boolean;
  className?: string;
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  type = 'button',
  variant = 'primary',
  style = 'solid',
  size = 'sm',
  isLoading = false,
  startIcon,
  endIcon,
  isFullWidth = false,
  onClick,
  disabled = false,
  className,
  ...props
}) => {
  const btnStyleSolidClasses = {
    primary: 'text-white bg-[#56B1F0]',
    black: 'text-white bg-black',
  };

  const btnStyleOutlineClasses = {
    primary: 'text-[#56B1F0] bg-white border border-[#56B1F0] hover:bg-[#56B1F0] hover:text-white',
    black: '',
  };

  const btnStyleWhiteClasses = {
    primary: 'text-gray-800 bg-white border border-gray-200 shadow-sm hover:bg-gray-50',
    black: '',
  };

  const buttonClasses = {
    base: `flex justify-center items-center rounded-lg font-bold focus:outline-none ${isFullWidth && 'w-full'}`,
    disabled: 'disabled:opacity-70 disabled:cursor-not-allowed',
    size: {
      xs: 'py-1 px-2 text-sm',
      sm: 'py-1 px-2 text-sm h-8',
      md: 'py-2 px-6 text-md',
      lg: 'py-3 px-8 text-lg',
    },
    style: {
      solid: btnStyleSolidClasses,
      outline: btnStyleOutlineClasses,
      white: btnStyleWhiteClasses,
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(`
        ${buttonClasses.base}
        ${buttonClasses.disabled}
        ${buttonClasses.size[size]}
        ${buttonClasses.style[style][variant]}
        ${className}
      `)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <span
          className="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-notey_text rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </span>
      )}
      {!isLoading && startIcon && <span className="h-5 w-5">{startIcon}</span>}
      <span className="mx-2">{props.children}</span>
      {!isLoading && endIcon && <span className="h-5 w-5">{endIcon}</span>}
    </button>
  );
};

export default Button;
