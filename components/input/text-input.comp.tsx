'use client';

import classNames from 'classnames';
import { TextInputProps } from './text-input.types';

const TextInput = ({ label, value, error, ...rest }: TextInputProps) => (
	<>
		<div
			className={classNames(
				'flex-1 rounded-xl px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset  focus-within:ring-2 focus-within:ring-dark',
				{
					'ring-gray-300': !error,
					'ring-red-500': !!error,
				},
			)}
		>
			<label htmlFor={rest.id} className="block text-xs font-medium text-slate-900">
				<span className="flex justify-between">{label}</span>
				<input
					type="text"
					value={value}
					className="block w-full border-0 p-0 text-slate-900 placeholder:text-slate-400 focus:ring-0 sm:text-sm sm:leading-6"
					{...rest}
				/>
			</label>
		</div>
		{error && <span className="text-sm text-red-500">{error}</span>}
	</>
);

export default TextInput;
