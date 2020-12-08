import React from 'react';

const Backdrop = (props) => {
	return (
		<div
			style={{
				position: 'fixed',
				top: '0',
				left: '0',
				width: '100%',
				height: '100%',
				background: 'rgba(0,0,0,0.26)',
				pointerEvents: 'all',
				zIndex: '100',
			}}
			onClick={props.clicked}
		>
			{props.children}
		</div>
	);
};

export default Backdrop;
