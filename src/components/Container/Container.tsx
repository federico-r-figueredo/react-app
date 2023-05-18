import { ReactNode } from 'react';

interface ContainerProps {
	children: ReactNode;
}

function Container({ children }: ContainerProps) {
	return (
		<div className="container mt-4">
			{children}
		</div>
	);
}

export default Container;
