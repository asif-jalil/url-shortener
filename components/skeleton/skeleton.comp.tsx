'use client';

import { SkeletonProps } from './skeleton.types';

const Skeleton = ({ count = 1 }: SkeletonProps) => {
	return (
		<div className="space-y-4">
			{Array.from({ length: count }).map((_, index) => (
				<div key={index} className="h-2 bg-slate-200 rounded animate-pulse"></div>
			))}
		</div>
	);
};

export default Skeleton;
