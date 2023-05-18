import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	type?: 'primary' | 'secondary' | 'danger';
	onClose: () => void;
}

export default function Alert({ children, type = 'primary', onClose }: Props) {
	return (
		<div
			className={'alert alert-' + type + ' alert-dismissible'}
			role="alert"
		>
			<div>{children}</div>
			<button
				type="button"
				onClick={onClose}
				className="btn-close"
				data-bs-dismiss="alert"
				aria-label="Close"
			></button>
		</div>
	);
}
