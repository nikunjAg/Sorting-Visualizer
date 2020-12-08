import React from 'react';
import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.module.css';

import { Transition } from 'react-transition-group';
import CloseIcon from '@material-ui/icons/Close';

const Modal = (props) => {
	return (
		<Transition in={props.show} timeout={400} mountOnEnter unmountOnExit>
			{(state) => {
				const classList = [
					classes.Modal,
					state === 'entering'
						? classes.OpenModal
						: state === 'exiting'
						? classes.CloseModal
						: '',
				].join(' ');
				return (
					<Backdrop clicked={props.onClose}>
						<div className={classList}>
							<div className={classes.ModalHeader}>
								<p>{props.algorithm?.name}</p>
								<CloseIcon
									className={classes.CloseModalButton}
									onClick={props.onClose}
								/>
							</div>
							<div className={classes.ModalContent}>
								<p>{props.algorithm?.content}</p>
								<img src={props.algorithm?.imageUrl} alt="Algorithm Details" />
								<p>
									<strong>Time Complexity: </strong>
									{props.algorithm?.timeComplexity}
								</p>
								<p>
									<strong>Space Complexity: </strong>
									{props.algorithm?.spaceComplexity}
								</p>
							</div>
						</div>
					</Backdrop>
				);
			}}
		</Transition>
	);
};

export default Modal;
