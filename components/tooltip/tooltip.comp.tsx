'use client';

import { Tooltip as ReactTooltip } from 'react-tooltip';

const Tooltip = () => (
	<ReactTooltip id="tooltip" style={{ fontSize: 12 }} place="top" variant="dark" render={({ content }) => content} />
);

export default Tooltip;
