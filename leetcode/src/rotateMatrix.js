// 给定一个 n × n 的二维矩阵表示一个图像。
// 将图像顺时针旋转 90 度。
// 说明：
// 你必须在原地旋转图像，这意味着你需要直接修改输入的二维矩阵。请不要使用另一个矩阵来旋转图像。

// 给定 matrix =
// [
//   [1,2,3],
//   [4,5,6],
//   [7,8,9]
// ],

// 原地旋转输入矩阵，使其变为:
// [
//   [7,4,1],
//   [8,5,2],
//   [9,6,3]
// ]

/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 * @TODO  减少元素的移动次数
 */
var rotate = function(matrix) {
  const run = (row, col, len) => {
    const start = matrix[row][col]

    const loop = (times, handler) => {
      for(let i = 0; i < times - 1; i++){
        handler(i)
      }
    }
    // left
    loop(len, () => matrix[row][col] = matrix[++row][col])
    // bottom
    loop(len, () => matrix[row][col] = matrix[row][++col])
    // right
    loop(len, () => matrix[row][col] = matrix[--row][col])
    // top
    loop(len - 1, () => matrix[row][col] = matrix[row][--col])
    matrix[row][col] = start
  }

  const len = matrix.length;
  if(len === 1) return;
  const runTimes = Math.floor(len/2)
  for (let i = runTimes - 1; i >= 0; i--) {
    // run(i, i,len - 2*i)
    for (let j = len - 2*(i + 1); j >= 0; j--) {
      // debugger
      run(i, i,len - 2*i)
    }
  }
};

const matrix = [
  [ 5, 1, 9,11],
  [ 2, 4, 8,10],
  [13, 3, 6, 7],
  [15,14,12,16]
]
rotate(matrix)
console.log(matrix)