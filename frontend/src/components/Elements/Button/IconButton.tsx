import React from 'react';
import clsx from 'clsx';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: ButtonSize;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  type = 'button',
  icon,
  size = 'xs',
  onClick,
  disabled = false,
  isLoading = false,
  className,
  ...props
}) => {
  const iconButtonClasses = {
    base: 'flex justify-center items-center rounded-lg hover:bg-stone-100 hover:active:bg-stone-200',
    disabled: 'disabled:opacity-50 disabled:cursor-not-allowed',
    size: {
      xs: 'p-1.5 text-sm',
      sm: 'py-1 px-2 text-sm h-8',
      md: 'py-2 px-6 text-md',
      lg: 'py-3 px-8 text-lg',
    },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        iconButtonClasses.base,
        iconButtonClasses.disabled,
        iconButtonClasses.size[size],
        className
      )}
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
      {!isLoading && <span className="h-5 w-5">{icon}</span>}
    </button>
  );
};

export default IconButton;
