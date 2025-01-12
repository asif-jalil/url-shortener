'use client';

import { ButtonProps } from './button.types';

const Button = ({ children, ...rest }: ButtonProps) => {
	return (
		<button
			{...rest}
			className="w-full flex justify-center items-center gap-2 active:scale-95 transition-transform duration-75 bg-dark hover:bg-dark/90 text-white font-semibold text-xs px-3 md:px-5 py-3 rounded-xl"
		>
			{children}
		</button>
	);
};

export default Button;
