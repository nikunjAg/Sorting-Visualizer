import classes from './SortingVisualizer.module.css';
import React, { Component } from 'react';
import ArrayBar from '../../components/ArrayBar/ArrayBar';
import Header from '../../components/Header/Header';
import * as sortingAlgorithmAnimations from '../../Algorithms/index';
import Modal from '../../components/Modal/Modal';

class SortingVisualizer extends Component {
	state = {
		array: [],
		arraySize: 50,
		currentAlgorithm: '',
		isSorting: false,
		showAlgorithmDetails: false,
		showDetailsAlgorithm: '',
		algorithms: {
			'Quick Sort': {
				name: 'Quick Sort',
				content:
					'QuickSort is a Divide and Conquer algorithm. It picks an element as pivot and partitions the given array around the picked pivot. There are many different versions of quickSort that pick pivot in different ways.',
				imageUrl:
					'https://www.geeksforgeeks.org/wp-content/uploads/gq/2014/01/QuickSort2.png',
				timeComplexity: 'O(nlogn)',
				spaceComplexity: 'O(n)',
			},
			'Merge Sort': {
				name: 'Merge Sort',
				content:
					'Merge Sort is a Divide and Conquer algorithm. It divides the input array into two halves, calls itself for the two halves, and then merges the two sorted halves. The merge() function is used for merging two halves. The merge(arr, l, m, r) is a key process that assumes that arr[l..m] and arr[m+1..r] are sorted and merges the two sorted sub-arrays into one.',
				imageUrl:
					'https://media.geeksforgeeks.org/wp-content/cdn-uploads/Merge-Sort-Tutorial.png',
				timeComplexity: 'O(nlogn)',
				spaceComplexity: 'O(n)',
			},
			'Bubble Sort': {
				name: 'Bubble Sort',
				content:
					'Bubble Sort is the simplest sorting algorithm that works by repeatedly swapping the adjacent elements if they are in wrong order.',
				imageUrl:
					'https://prepinsta.com/wp-content/uploads/2020/06/Bubble-Sort-In-C-Final.webp',
				timeComplexity: 'O(n^2)',
				spaceComplexity: 'O(1)',
			},
			'Heap Sort': {
				name: 'Heap Sort',
				content:
					'Heap sort is a comparison based sorting technique based on Binary Heap data structure. It is similar to selection sort where we first find the maximum element and place the maximum element at the end. We repeat the same process for the remaining elements.',
				imageUrl: 'https://he-s3.s3.amazonaws.com/media/uploads/c9fa843.png',
				timeComplexity: 'O(nlogn)',
				spaceComplexity: 'O(n)',
			},
		},
	};

	componentDidMount() {
		this.generateNewArrayHandler();
	}

	getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	generateNewArrayHandler = () => {
		const updatedArray = [...Array(this.state.arraySize)].map((e) =>
			this.getRandomInt(15, 450)
		);
		this.setState({ array: updatedArray });
	};

	setSortingAlgorithmHandler = (algorithmName) => {
		this.setState({ currentAlgorithm: algorithmName, isSorting: false });
	};

	sortHandler = () => {
		this.setState({ isSorting: true });

		if (this.state.currentAlgorithm === 'Merge Sort') this.mergeSortHandler();
		else if (this.state.currentAlgorithm === 'Bubble Sort')
			this.bubbleSortHandler();
		else if (this.state.currentAlgorithm === 'Quick Sort')
			this.quickSortHandler();
		else this.heapSortHandler();
	};

	onFinishSortingHandler = (finishTime) => {
		setTimeout(() => {
			const updatedArray = [...this.state.array];
			const sortedArray = updatedArray.sort((a, b) => a - b);
			this.setState({ array: sortedArray, isSorting: false }, () => {
				Array.from(document.getElementsByClassName('ArrayBar')).forEach(
					(arrayBar) => (arrayBar.className = 'ArrayBar')
				);
			});
		}, finishTime + 1000);
	};
	mergeSortHandler = () => {
		const animations = sortingAlgorithmAnimations.getMergeSortAnimations([
			...this.state.array,
		]);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('ArrayBar');

			if (i % 3 !== 2) {
				setTimeout(() => {
					const [barOneIdx, barTwoIdx] = animations[i];
					if (i % 3 === 0) {
						arrayBars[barOneIdx].classList.add('Comparing');
						arrayBars[barTwoIdx].classList.add('Comparing');
					} else {
						arrayBars[barOneIdx].classList.remove('Comparing');
						arrayBars[barTwoIdx].classList.remove('Comparing');
					}
				}, i * 10);
			} else {
				setTimeout(() => {
					const [barOneIdx, updatedHeight, isFinalSorting] = animations[i];
					arrayBars[barOneIdx].className =
						'ArrayBar ' + (isFinalSorting ? 'Sorted' : 'Sorting');
					arrayBars[barOneIdx].style.height = `${updatedHeight}px`;
				}, i * 10);
			}
		}
		this.onFinishSortingHandler(animations.length * 10);
	};
	bubbleSortHandler = () => {
		const animations = sortingAlgorithmAnimations.getBubbleSortAnimations([
			...this.state.array,
		]);

		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('ArrayBar');
			if (animations[i][2] !== 3) {
				setTimeout(() => {
					const [barOneIdx, barTwoIdx, addClass] = animations[i];
					if (addClass === 1) {
						arrayBars[barOneIdx].classList.add('Comparing');
						arrayBars[barTwoIdx].classList.add('Comparing');
					} else {
						arrayBars[barOneIdx].classList.remove('Comparing');
						arrayBars[barTwoIdx].classList.remove('Comparing');
						arrayBars[barOneIdx].classList.add('Sorting');
						arrayBars[barTwoIdx].classList.add('Sorting');
					}
				}, i * 10);
			} else {
				setTimeout(() => {
					const [finalIdx, largestIdx] = animations[i];
					const tempHeight = arrayBars[largestIdx].style.height;
					arrayBars[largestIdx].style.height = arrayBars[finalIdx].style.height;
					arrayBars[finalIdx].style.height = tempHeight;
					arrayBars[largestIdx].className = 'ArrayBar Sorting';
					arrayBars[finalIdx].className = 'ArrayBar Sorted';
				}, i * 10);
			}
		}
		this.onFinishSortingHandler(animations.length * 10);
	};
	quickSortHandler = () => {
		const animations = sortingAlgorithmAnimations.getQuickSortAnimations([
			...this.state.array,
		]);

		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('ArrayBar');
			if (animations[i][2] !== 4) {
				setTimeout(() => {
					const [barOneIdx, barTwoIdx, animationIdx] = animations[i];
					const barOne = arrayBars[barOneIdx];
					const barTwo = arrayBars[barTwoIdx];
					if (animationIdx === 1) {
						barOne.classList.add('Comparing');
						barTwo.classList.add('Comparing');
					} else if (animationIdx === 2) {
						barOne.classList.remove('Comparing');
						barTwo.classList.remove('Comparing');

						barOne.classList.add('Sorting');
						barTwo.classList.add('Sorting');
					} else {
						const tempHeight = barOne.style.height;
						barOne.style.height = barTwo.style.height;
						barTwo.style.height = tempHeight;
					}
				}, i * 10);
			} else {
				// This is the final position
				setTimeout(() => {
					const [sortedPos, lastPos] = animations[i];
					const sortedBar = arrayBars[sortedPos];
					const lastBar = arrayBars[lastPos];

					const temp = lastBar.style.height;
					lastBar.style.height = sortedBar.style.height;
					sortedBar.style.height = temp;
					// Order matters as if both the indexes are same then we want to have sorted class at the end
					lastBar.className = 'ArrayBar Sorting';
					sortedBar.className = 'ArrayBar Sorted';
				}, i * 10);
			}
		}
		this.onFinishSortingHandler(animations.length * 10);
	};
	heapSortHandler = () => {
		const animations = sortingAlgorithmAnimations.getHeapSortAnimations([
			...this.state.array,
		]);

		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('ArrayBar');
			if (animations[i][2] !== 3) {
				setTimeout(() => {
					const [barOneIdx, barTwoIdx, animationIdx] = animations[i];
					if (animationIdx === 0) {
						arrayBars[barOneIdx].classList.add('Comparing');
						arrayBars[barTwoIdx].classList.add('Comparing');
					} else if (animationIdx === 1) {
						arrayBars[barOneIdx].classList.remove('Comparing');
						arrayBars[barTwoIdx].classList.remove('Comparing');
					} else {
						const tempHeight = arrayBars[barOneIdx].style.height;
						arrayBars[barOneIdx].style.height =
							arrayBars[barTwoIdx].style.height;
						arrayBars[barTwoIdx].style.height = tempHeight;
						arrayBars[barOneIdx].classList.add('Sorting');
					}
				}, i * 10);
			} else {
				setTimeout(() => {
					const [barOneIdx, barTwoIdx] = animations[i];
					const tempHeight = arrayBars[barOneIdx].style.height;
					arrayBars[barOneIdx].style.height = arrayBars[barTwoIdx].style.height;
					arrayBars[barTwoIdx].style.height = tempHeight;
					arrayBars[barOneIdx].className = 'ArrayBar Sorted';
				}, i * 10);
			}
		}
		this.onFinishSortingHandler(animations.length * 10);
	};

	onShowAlgorithmDetailsHandler = (algorithm) => {
		this.setState({
			showAlgorithmDetails: true,
			showDetailsAlgorithm: algorithm,
		});
	};
	onHideAlgorithmDetailsHandler = () => {
		this.setState({ showAlgorithmDetails: false });
	};

	render() {
		const arrayBars = this.state.array.map((e, index) => (
			<ArrayBar key={index} value={e} />
		));
		return (
			<div className={classes.SortingVisualizer}>
				<Modal
					algorithm={this.state.algorithms[this.state.showDetailsAlgorithm]}
					show={this.state.showAlgorithmDetails}
					onClose={this.onHideAlgorithmDetailsHandler}
				/>
				<Header
					onGenerateNewArray={this.generateNewArrayHandler}
					onSetSortingAlgorithm={this.setSortingAlgorithmHandler}
					onSortArray={this.sortHandler}
					currentSelected={this.state.currentAlgorithm}
					disabled={this.state.isSorting}
					showMoreDetails={this.onShowAlgorithmDetailsHandler}
				/>
				<div className={classes.SortingVisualizer__ArrayBars}>{arrayBars}</div>
			</div>
		);
	}
}

export default SortingVisualizer;
