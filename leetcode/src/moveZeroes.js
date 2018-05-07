// 给定一个数组 nums, 编写一个函数将所有 0 移动到它的末尾，同时保持非零元素的相对顺序。

// 例如， 定义 nums = [0, 1, 0, 3, 12]，调用函数之后， nums 应为 [1, 3, 12, 0, 0]。

// 注意事项:

// 必须在原数组上操作，不要为一个新数组分配额外空间。
// 尽量减少操作总数。

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
  function swap(a, b) {
    const tmp = nums[a]
    nums[a] = nums[b]
    nums[b] = tmp
  }
  let start = 0;
  for (let end = 0; end < nums.length; end++) {
    const element = nums[end];
    if(element !== 0) {
      swap(start, end)
      start++
    }
  }
  return nums
};

console.log(moveZeroes([0, 1, 0, 3, 12]));
