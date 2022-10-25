function  minimum(nums=[]) {
  let sum = nums.reduce((a,b)=>a+b)
  let min = Number.MAX_VALUE;

  let psum = 0;

  for(let i=0,j=0,len=nums.length;i<len&&j<len;j++){
    psum+=nums[j];
    if (sum ===2*psum) {
      return 0;
    } else if (sum > 2*psum){
      min = Math.min(min, sum-2*psum)
    } else {
      psum -=nums[i]
      i++
    }
  }

  return min
}

console.log(minimum([1,2,3,4,5]))
console.log(minimum([1,2,3,4,5,6]))
console.log(minimum([7,5,3,6,4,2,1]))
