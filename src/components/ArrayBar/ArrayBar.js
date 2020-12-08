import React from 'react';
import './ArrayBar.css';

const ArrayBar = (props) => {
	const classList = ['ArrayBar', props.classes ? props.classes : ''].join(' ');
	return (
		<div className={classList} style={{ height: props.value + 'px' }}></div>
	);
};

export default ArrayBar;
