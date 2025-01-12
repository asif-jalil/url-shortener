import { render, fireEvent, screen } from '@testing-library/react';
import CopyToClipboard from './copy-to-clipboard.comp';
import copy from 'copy-to-clipboard';
import '@testing-library/jest-dom';

jest.mock('copy-to-clipboard', () => jest.fn());

describe('CopyToClipboard', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders the child element correctly', () => {
		render(
			<CopyToClipboard text="Text to copy">
				<button>Copy Text</button>
			</CopyToClipboard>,
		);

		expect(screen.getByText('Copy Text')).toBeInTheDocument();
	});

	it('calls copy function with correct text when clicked', () => {
		const textToCopy = 'Hello, World!';
		(copy as jest.Mock).mockReturnValue(true);

		render(
			<CopyToClipboard text={textToCopy}>
				<button>Copy Text</button>
			</CopyToClipboard>,
		);

		fireEvent.click(screen.getByText('Copy Text'));
		expect(copy).toHaveBeenCalledWith(textToCopy);
	});

	it('calls onCopy callback with text and result when copying succeeds', () => {
		const textToCopy = 'Test text';
		const onCopy = jest.fn();
		(copy as jest.Mock).mockReturnValue(true);

		render(
			<CopyToClipboard text={textToCopy} onCopy={onCopy}>
				<button>Copy Text</button>
			</CopyToClipboard>,
		);

		fireEvent.click(screen.getByText('Copy Text'));
		expect(onCopy).toHaveBeenCalledWith(textToCopy, true);
	});

	it('calls onCopy callback with text and result when copying fails', () => {
		const textToCopy = 'Test text';
		const onCopy = jest.fn();
		(copy as jest.Mock).mockReturnValue(false);

		render(
			<CopyToClipboard text={textToCopy} onCopy={onCopy}>
				<button>Copy Text</button>
			</CopyToClipboard>,
		);

		fireEvent.click(screen.getByText('Copy Text'));
		expect(onCopy).toHaveBeenCalledWith(textToCopy, false);
	});

	it('works with different child elements', () => {
		render(
			<CopyToClipboard text="Copy text">
				<div data-testid="custom-element">Custom Element</div>
			</CopyToClipboard>,
		);

		const element = screen.getByTestId('custom-element');
		fireEvent.click(element);
		expect(copy).toHaveBeenCalled();
	});
});
