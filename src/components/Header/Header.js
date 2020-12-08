import React from 'react';
import classes from './Header.module.css';

import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

const Header = (props) => {
	const onSelectingAlgorithm = (event) => {
		props.onSetSortingAlgorithm(event.target.innerText);
	};

	return (
		<div className={classes.Header}>
			<div className={classes.Row1}>
				<div className={classes.Logo}>Sorting Visualizer</div>
				<button
					className={classes.HeaderItem + ' ' + classes.GenerateArrBtn}
					onClick={props.onGenerateNewArray}
					disabled={props.disabled}
				>
					Generate New Array
				</button>
				<button
					className={classes.SortBtn}
					onClick={props.onSortArray}
					disabled={props.disabled}
				>
					SORT
				</button>
			</div>
			<div className={classes.Row2}>
				<div className={classes.Algorithms}>
					<div className={classes.AlgorithmLabel}>Algorithms</div>
					<div className={classes.Algos}>
						<div
							className={
								classes.Algorithm +
								' ' +
								(props.currentSelected === 'Merge Sort' ? classes.Selected : '')
							}
						>
							<InfoOutlinedIcon
								className={classes.MoreInfoButton}
								onClick={() => props.showMoreDetails('Merge Sort')}
							/>
							<button
								className={classes.HeaderItem}
								onClick={onSelectingAlgorithm}
								disabled={props.disabled}
							>
								Merge Sort
							</button>
						</div>
						<div
							className={
								classes.Algorithm +
								' ' +
								(props.currentSelected === 'Bubble Sort'
									? classes.Selected
									: '')
							}
						>
							<InfoOutlinedIcon
								className={classes.MoreInfoButton}
								onClick={() => props.showMoreDetails('Bubble Sort')}
							/>
							<button
								className={classes.HeaderItem}
								onClick={onSelectingAlgorithm}
								disabled={props.disabled}
							>
								Bubble Sort
							</button>
						</div>
						<div
							className={
								classes.Algorithm +
								' ' +
								(props.currentSelected === 'Quick Sort' ? classes.Selected : '')
							}
						>
							<InfoOutlinedIcon
								className={classes.MoreInfoButton}
								onClick={() => props.showMoreDetails('Quick Sort')}
							/>
							<button
								className={classes.HeaderItem}
								onClick={onSelectingAlgorithm}
								disabled={props.disabled}
							>
								Quick Sort
							</button>
						</div>
						<div
							className={
								classes.Algorithm +
								' ' +
								(props.currentSelected === 'Heap Sort' ? classes.Selected : '')
							}
						>
							<InfoOutlinedIcon
								className={classes.MoreInfoButton}
								onClick={() => props.showMoreDetails('Heap Sort')}
							/>
							<button
								className={classes.HeaderItem}
								onClick={onSelectingAlgorithm}
								disabled={props.disabled}
							>
								Heap Sort
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
