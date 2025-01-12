import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LinkManagement from './link-management.comp';
import { Link } from '../short-link/short-link.types';
import { act } from 'react';

global.fetch = jest.fn();

jest.mock('../skeleton/skeleton.comp', () => ({
	__esModule: true,
	default: () => <div data-testid="skeleton">Loading...</div>,
}));

jest.mock('../short-link/short-link.comp', () => ({
	__esModule: true,
	default: ({ link }: { link: Link }) => <div data-testid="short-link">{link.originalLink}</div>,
}));

describe('LinkManagement', () => {
	const mockLinks: Link[] = [
		{ id: 1, originalLink: 'https://example1.com', shortLink: 'abc123', views: 0 },
		{ id: 2, originalLink: 'https://example2.com', shortLink: 'def456', views: 5 },
	];

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('renders loading state initially', async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			json: () => Promise.resolve({ success: true, data: { links: [] } }),
		});

		await act(async () => {
			render(<LinkManagement />);
		});

		expect(screen.getByText('Shorten URLs')).toBeInTheDocument();
	});

	it('loads and displays links from API', async () => {
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			json: () => Promise.resolve({ success: true, data: { links: mockLinks } }),
		});

		await act(async () => {
			render(<LinkManagement />);
		});

		for (const link of mockLinks) {
			await waitFor(() => {
				expect(screen.getByText(link.originalLink)).toBeInTheDocument();
			});
		}
	});

	it('handles form submission successfully', async () => {
		const newLink: Link = {
			id: 3,
			originalLink: 'https://example3.com',
			shortLink: 'ghi789',
			views: 0,
		};

		// Mock initial GET request
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			json: () => Promise.resolve({ success: true, data: { links: mockLinks } }),
		});

		// Mock POST request
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			json: () => Promise.resolve({ success: true, data: newLink }),
		});

		await act(async () => {
			render(<LinkManagement />);
		});

		const input = screen.getByPlaceholderText('https://example.com');
		const submitButton = screen.getByRole('button', { name: /shorten url/i });

		await act(async () => {
			fireEvent.change(input, { target: { value: 'https://example3.com' } });
		});

		await act(async () => {
			fireEvent.click(submitButton);
		});

		await waitFor(() => {
			expect(screen.getByText(newLink.originalLink)).toBeInTheDocument();
		});
	});

	it('displays error message on form submission failure', async () => {
		// Mock initial GET request
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			json: () => Promise.resolve({ success: true, data: { links: [] } }),
		});

		// Mock failed POST request
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			json: () =>
				Promise.resolve({
					success: false,
					errors: { link: 'Invalid URL format' },
				}),
		});

		await act(async () => {
			render(<LinkManagement />);
		});

		const input = screen.getByPlaceholderText('https://example.com');
		const submitButton = screen.getByRole('button', { name: /shorten url/i });

		await act(async () => {
			fireEvent.change(input, { target: { value: 'invalid-url' } });
		});

		await act(async () => {
			fireEvent.click(submitButton);
		});

		await waitFor(() => {
			expect(screen.getByText('Invalid URL format')).toBeInTheDocument();
		});
	});

	it('preserves existing links when adding new one', async () => {
		const newLink: Link = {
			id: 3,
			originalLink: 'https://example3.com',
			shortLink: 'ghi789',
			views: 0,
		};

		// Mock initial GET request
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			json: () => Promise.resolve({ success: true, data: { links: mockLinks } }),
		});

		// Mock POST request
		(global.fetch as jest.Mock).mockResolvedValueOnce({
			json: () => Promise.resolve({ success: true, data: newLink }),
		});

		await act(async () => {
			render(<LinkManagement />);
		});

		const input = screen.getByPlaceholderText('https://example.com');
		const submitButton = screen.getByRole('button', { name: /shorten url/i });

		await act(async () => {
			fireEvent.change(input, { target: { value: newLink.originalLink } });
		});

		await act(async () => {
			fireEvent.click(submitButton);
		});

		await waitFor(() => {
			expect(screen.getByText(newLink.originalLink)).toBeInTheDocument();
			mockLinks.forEach((link) => {
				expect(screen.getByText(link.originalLink)).toBeInTheDocument();
			});
		});
	});

	it('handles empty views count', async () => {
		const linkWithZeroViews: Link = {
			id: 1,
			originalLink: 'https://example.com',
			shortLink: 'abc123',
			views: 0,
		};

		(global.fetch as jest.Mock).mockResolvedValueOnce({
			json: () =>
				Promise.resolve({
					success: true,
					data: { links: [linkWithZeroViews] },
				}),
		});

		await act(async () => {
			render(<LinkManagement />);
		});

		await waitFor(() => {
			expect(screen.getByText(linkWithZeroViews.originalLink)).toBeInTheDocument();
		});
	});
});
