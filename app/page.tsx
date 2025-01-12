import Header from '@/components/header/header.comp';
import LinkManagement from '@/components/link-management/link-management.comp';

export default function Page() {
	return (
		<>
			<Header />
			<div className="relative mx-auto max-w-xl px-6 lg:px-8 py-16">
				<div className="space-y-10">
					<LinkManagement />
				</div>
			</div>
		</>
	);
}
