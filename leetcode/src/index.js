// 给定两个大小为 m 和 n 的有序数组 nums1 和 nums2 。
// 请找出这两个有序数组的中位数。要求算法的时间复杂度为 O(log (m+n)) 。

// 示例 1:
// nums1 = [1, 3]
// nums2 = [2]
// 中位数是 2.0

// 示例 2:
// nums1 = [1, 2]
// nums2 = [3, 4]
// 中位数是 (2 + 3)/2 = 2.5

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */

var findMedianSortedArrays = function(nums1, nums2) {
  if(nums1.length === 0 && nums2.length === 0) return;
  if(nums1.length === 0) return getMiddle(nums2);
  if(nums2.length === 0) return getMiddle(nums1);

  const nums1Min = nums1[0], nums1Max = nums1[nums1.length - 1]
  const nums2Min = nums2[0], nums2Max = nums2[nums2.length - 1]

  if(nums1Max < nums2Min){
    nums1 = nums1.concat(nums2)
  } else if(nums1Min > nums2Max) {
    nums1 = nums2.concat(nums1)
  } else {
    nums1 = merge(nums1, nums2, nums1Max, nums1Min, nums2Max, nums2Min)
  }

  return getMiddle(nums1)
};

var getMiddle = function(nums) {
  const len = nums.length
  let middle
  if(len%2 === 0) {
    middle = (nums[len/2] + nums[len/2 - 1])/2
  } else {
    const half = Math.floor(len/2)
    middle = nums[half]
  }
  return middle
}

var merge = function(nums1, nums2, nums1Max, nums1Min, nums2Max, nums2Min) {
  const result = []
  if(nums1Min > nums2Min) {
    for (let i = 1; i < nums1.length; i++) {
      const element = nums1[i];
      const j = nums2[0]
      if(element > )

    }
    let i1 = nums1.length - 2
    let j2 = nums2.length - 1
    while(i1 > 0) {
      nums1[i1]
    }
  }
}
