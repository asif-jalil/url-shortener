import { render, screen, fireEvent, act } from '@testing-library/react';
import ShortLink from './short-link.comp';
import '@testing-library/jest-dom';

jest.mock('react-icons/bs', () => ({
	BsCheckLg: () => <div data-testid="check-icon">Check</div>,
	BsCopy: () => <div data-testid="copy-icon">Copy</div>,
	BsEye: () => <div data-testid="eye-icon">Eye</div>,
}));

jest.mock('../copy-to-clipboard/copy-to-clipboard.comp', () => ({
	__esModule: true,
	default: ({ children, onCopy }: { children: React.ReactNode; onCopy: () => void }) => (
		<div onClick={onCopy} data-testid="copy-wrapper">
			{children}
		</div>
	),
}));

describe('ShortLink', () => {
	const mockLink = {
		id: 1,
		originalLink: 'https://example.com',
		shortLink: 'https://short.url/abc123',
		views: 42,
	};

	beforeEach(() => {
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.useRealTimers();
	});

	it('renders short link correctly', () => {
		render(<ShortLink link={mockLink} />);
		expect(screen.getByText(mockLink.shortLink)).toBeInTheDocument();
	});

	it('renders view count correctly', () => {
		render(<ShortLink link={mockLink} />);
		expect(screen.getByText('42 views')).toBeInTheDocument();
	});

	it('shows copy icon by default', () => {
		render(<ShortLink link={mockLink} />);
		expect(screen.getByTestId('copy-icon')).toBeInTheDocument();
		expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument();
	});

	it('changes to check icon when copied and back after timeout', () => {
		render(<ShortLink link={mockLink} />);

		// Initial state
		expect(screen.getByTestId('copy-icon')).toBeInTheDocument();

		// Click copy
		fireEvent.click(screen.getByTestId('copy-wrapper'));

		// Should show check icon
		expect(screen.getByTestId('check-icon')).toBeInTheDocument();
		expect(screen.queryByTestId('copy-icon')).not.toBeInTheDocument();

		// Fast-forward 2 seconds
		act(() => {
			jest.advanceTimersByTime(2000);
		});

		// Should show copy icon again
		expect(screen.getByTestId('copy-icon')).toBeInTheDocument();
		expect(screen.queryByTestId('check-icon')).not.toBeInTheDocument();
	});

	it('clears timeout on component unmount', () => {
		const { unmount } = render(<ShortLink link={mockLink} />);

		fireEvent.click(screen.getByTestId('copy-wrapper'));

		unmount();

		expect(() => {
			act(() => {
				jest.advanceTimersByTime(2000);
			});
		}).not.toThrow();
	});

	it('has correct ARIA attributes', () => {
		render(<ShortLink link={mockLink} />);

		const copyButton = screen.getByTestId('copy-wrapper').parentElement;
		expect(copyButton).toHaveAttribute('data-tooltip-id', 'tooltip');
		expect(copyButton).toHaveAttribute('data-tooltip-content', 'Copy');
		expect(copyButton).toHaveAttribute('aria-disabled', 'false');

		fireEvent.click(screen.getByTestId('copy-wrapper'));
		expect(copyButton).toHaveAttribute('data-tooltip-content', 'Copied!');
	});
});
