/**
 * 字符串中的第一个唯一字符
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
  const visited = {}
  for (let i = 0, len = s.length; i < len; i++) {
    const element = s[i];
    let cur = visited[element]
    visited[element] = cur ? cur+1:1
  }

  for (let i = 0, len = s.length; i < len; i++) {
    const element = s[i];
    if(visited[element] > 1) continue;
    return i;
  }
  return -1;
};