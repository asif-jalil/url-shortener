import { render, screen } from '@testing-library/react';
import Header from './header.comp';
import '@testing-library/jest-dom';

jest.mock('next/link', () => {
	const MockLink = ({ children, href, ...rest }: { children: React.ReactNode; href: string }) => {
		return (
			<a href={href} {...rest}>
				{children}
			</a>
		);
	};
	MockLink.displayName = 'MockLink';
	return MockLink;
});

jest.mock('react-icons/fa', () => ({
	FaGithub: () => <span data-testid="github-icon">GithubIcon</span>,
}));

describe('Header', () => {
	it('renders the title correctly', () => {
		render(<Header />);
		const heading = screen.getByRole('heading', { level: 1 });
		expect(heading).toHaveTextContent('URL Shortener');
	});

	it('renders the description text', () => {
		render(<Header />);
		const description = screen.getByText('Generate a temporary short URL for your long links and share them easily.');
		expect(description).toBeInTheDocument();
	});

	it('renders the GitHub link with correct attributes', () => {
		render(<Header />);
		const link = screen.getByRole('link');

		expect(link).toHaveAttribute('href', 'https://github.com/asif-jalil/url-shortener');
		expect(link).toHaveAttribute('target', '_blank');
	});

	it('renders the GitHub icon and text', () => {
		render(<Header />);

		const githubIcon = screen.getByTestId('github-icon');
		const githubText = screen.getByText('Github');

		expect(githubIcon).toBeInTheDocument();
		expect(githubText).toBeInTheDocument();
	});
});
