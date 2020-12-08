const partition = (startIdx, endIdx, array, animations) => {
	const pivot = array[endIdx];
	let i = startIdx;
	for (let j = startIdx; j < endIdx; j++) {
		animations.push([j, endIdx, 1]);
		animations.push([j, endIdx, 2]);
		if (array[j] < pivot) {
			const temp = array[i];
			array[i] = array[j];
			array[j] = temp;
			animations.push([i, j, 3]);
			++i;
		}
	}
	const temp = array[i];
	array[i] = array[endIdx];
	array[endIdx] = temp;
	animations.push([i, endIdx, 4]);
	return i;
};

const quickSort = (startIdx, endIdx, array, animations) => {
	if (startIdx <= endIdx) {
		const mid = partition(startIdx, endIdx, array, animations);
		quickSort(startIdx, mid - 1, array, animations);
		quickSort(mid + 1, endIdx, array, animations);
	}
};

export const getQuickSortAnimations = (array) => {
	const animations = [];
	quickSort(0, array.length - 1, array, animations);
	return animations;
};
