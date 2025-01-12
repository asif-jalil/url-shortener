import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Skeleton from './skeleton.comp';

describe('Skeleton', () => {
	it('renders with default count of 1', () => {
		const { container } = render(<Skeleton />);

		const skeletonContainer = container.firstChild as HTMLElement;
		const skeletonItems = skeletonContainer.children;

		expect(skeletonContainer).toBeInTheDocument();
		expect(skeletonItems).toHaveLength(1);
		expect(skeletonItems[0]).toHaveClass('h-2', 'bg-slate-200', 'rounded', 'animate-pulse');
	});

	it('renders multiple skeleton items based on count prop', () => {
		const count = 3;
		const { container } = render(<Skeleton count={count} />);

		const skeletonContainer = container.firstChild as HTMLElement;
		const skeletonItems = skeletonContainer.children;

		expect(skeletonItems).toHaveLength(count);

		Array.from(skeletonItems).forEach((item) => {
			expect(item).toHaveClass('h-2', 'bg-slate-200', 'rounded', 'animate-pulse');
		});
	});

	it('applies correct spacing between skeleton items', () => {
		const { container } = render(<Skeleton count={2} />);

		const skeletonContainer = container.firstChild as HTMLElement;

		expect(skeletonContainer).toHaveClass('space-y-4');
	});

	it('renders with zero count', () => {
		const { container } = render(<Skeleton count={0} />);

		const skeletonContainer = container.firstChild as HTMLElement;
		const skeletonItems = skeletonContainer.children;

		expect(skeletonItems).toHaveLength(0);
	});
});
