export const getBubbleSortAnimations = (array) => {
	const animations = [];
	bubbleSortArray(array.length - 1, array, animations);
	return animations;
};

const bubbleSortArray = (endIdx, array, animations) => {
	if (endIdx >= 0) {
		let resIdx = 0;
		for (let idx = 1; idx <= endIdx; idx++) {
			animations.push([resIdx, idx, 1]);
			animations.push([resIdx, idx, 2]);
			if (array[idx] > array[resIdx]) {
				resIdx = idx;
			}
		}
		const temp = array[endIdx];
		array[endIdx] = array[resIdx];
		array[resIdx] = temp;
		animations.push([endIdx, resIdx, 3]);
		bubbleSortArray(endIdx - 1, array, animations);
	}
};
