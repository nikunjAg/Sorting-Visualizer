const heapify = (array, size, i, animations) => {
	let largest = i;
	const leftChild = 2 * i + 1;
	const rightChild = 2 * i + 2;

	if (leftChild < size && array[leftChild] > array[largest]) {
		largest = leftChild;
		animations.push([i, largest, 0]);
	}
	animations.push([i, largest, 1]);
	if (rightChild < size && array[rightChild] > array[largest]) {
		largest = rightChild;
		animations.push([i, largest, 0]);
	}
	animations.push([i, largest, 1]);

	if (largest !== i) {
		const temp = array[i];
		array[i] = array[largest];
		array[largest] = temp;
		animations.push([i, largest, 2]);
		heapify(array, size, largest, animations);
	}
};

const heapSort = (array, animations) => {
	const size = array.length;

	for (let i = Math.floor(size / 2) - 1; i >= 0; i--)
		heapify(array, size, i, animations);

	for (let i = size - 1; i >= 0; i--) {
		const temp = array[0];
		array[0] = array[i];
		array[i] = temp;
		animations.push([i, 0, 3]);
		heapify(array, i, 0, animations);
	}
};

export const getHeapSortAnimations = (array) => {
	const animations = [];
	heapSort(array, animations);
	return animations;
};
