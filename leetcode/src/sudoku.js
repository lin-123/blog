
class SudoKu {
  constructor(arr) {
    this.origin = arr
    this.BAK = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    this.LEN = 9

    const result = this.run({ x: 0, y: 0})
    if(!result) return console.error('输入数据不合法');
    console.log(arr);
  }

  run(x, y) {
    console.log(x, y)
    const arr = this.origin
    if(arr[x][y] > 0) return this._next(x, y);

    // 递归流程
    const nums = this._getNums(x, y)
    if(nums.length === 0) return false;

    for (var i = nums.length - 1; i >= 0; i--) {
      arr[x][y] = nums[idx]
      console.log(arr.join('\n'))
      if(this._next(x, y)) return true;
    }

    arr[x][y] = 0
    return false
  }

  _next(x, y) {
    y++
    if(y > this.LEN - 1) {
      y = 0
      x++
    }
    if(x > this.LEN - 1) return true;
    return this.run(x, y)
  }

  // 获取当前行列 3*3内不存在的数字
  _getNums(x, y) {
    const [...BAK] = this.BAK
    const {origin} = this
    const drop = (cur) => {
      if(cur > 0) BAK[cur-1] = -1
    }

    for(let i = 0; i < this.LEN; i++) {
      drop(origin[i][y])
      drop(origin[x][i])
    }

    const top = x - x%3
    const left = y - y%3
    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        drop(origin[top + i][left + j])
      }
    }
    return BAK.filter(i => i > 0)
  }
}

const arr = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
]

const arr3 = [
  [5, 3, 0],
  [6, 0, 0],
  [0, 9, 8],
]

// new SudoKu(arr)

