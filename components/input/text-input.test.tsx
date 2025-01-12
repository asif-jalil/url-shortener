import { render, screen } from '@testing-library/react';
import TextInput from '@/components/input/text-input.comp';
import '@testing-library/jest-dom';

describe('TextInput Component', () => {
	it('renders with label and input', () => {
		render(<TextInput label="Test Label" value="" onChange={() => {}} placeholder="Test placeholder" />);

		expect(screen.getByText('Test Label')).toBeInTheDocument();
		expect(screen.getByPlaceholderText('Test placeholder')).toBeInTheDocument();
	});

	it('displays error message when provided', () => {
		render(<TextInput label="Test Label" value="" onChange={() => {}} error="Error message" />);

		expect(screen.getByText('Error message')).toBeInTheDocument();
	});
});
