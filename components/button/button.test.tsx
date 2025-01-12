import { render, screen, fireEvent } from '@testing-library/react';
import Button from './button.comp';
import '@testing-library/jest-dom';

describe('Button Component', () => {
	it('renders children correctly', () => {
		render(<Button>Click me</Button>);
		expect(screen.getByText('Click me')).toBeInTheDocument();
	});

	it('spreads additional props correctly', () => {
		const onClick = jest.fn();
		render(
			<Button onClick={onClick} data-testid="custom-button" aria-label="Custom Button">
				Test
			</Button>,
		);

		const button = screen.getByTestId('custom-button');
		expect(button).toHaveAttribute('aria-label', 'Custom Button');

		fireEvent.click(button);
		expect(onClick).toHaveBeenCalledTimes(1);
	});

	it('is disabled when disabled prop is true', () => {
		render(<Button disabled>Disabled Button</Button>);
		expect(screen.getByRole('button')).toBeDisabled();
	});
});
