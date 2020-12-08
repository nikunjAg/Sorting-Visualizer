const mergeSortedArrays = (
	startIdx,
	mid,
	endIdx,
	array,
	auxilliary,
	animations,
	isFinalSorting
) => {
	let idx = startIdx,
		i = startIdx,
		j = mid + 1;

	while (i <= mid && j <= endIdx) {
		animations.push([i, j]);
		animations.push([i, j]);
		if (auxilliary[i] <= auxilliary[j]) {
			animations.push([idx, auxilliary[i], isFinalSorting]);
			array[idx++] = auxilliary[i++];
		} else {
			animations.push([idx, auxilliary[j], isFinalSorting]);
			array[idx++] = auxilliary[j++];
		}
	}

	while (i <= mid) {
		animations.push([i, i]);
		animations.push([i, i]);
		animations.push([idx, auxilliary[i], isFinalSorting]);
		array[idx++] = auxilliary[i++];
	}
	while (j <= endIdx) {
		animations.push([j, j]);
		animations.push([j, j]);
		animations.push([idx, auxilliary[j], isFinalSorting]);
		array[idx++] = auxilliary[j++];
	}
	array.forEach((e, idx) => (auxilliary[idx] = e));
};

const mergeSortHelper = (startIdx, endIdx, array, auxilliary, animations) => {
	if (startIdx === endIdx) return;
	const mid = Math.floor((startIdx + endIdx) / 2);
	mergeSortHelper(startIdx, mid, array, auxilliary, animations);
	mergeSortHelper(mid + 1, endIdx, array, auxilliary, animations);
	mergeSortedArrays(
		startIdx,
		mid,
		endIdx,
		array,
		auxilliary,
		animations,
		startIdx === 0 && endIdx === array.length - 1
	);
};

export const getMergeSortAnimations = (array) => {
	const animations = [];
	const auxilliary = [...array];
	mergeSortHelper(0, array.length - 1, array, auxilliary, animations);
	return animations;
};
