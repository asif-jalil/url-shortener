export type TextInputProps = {
	label: string;
	value: string;
	error?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
