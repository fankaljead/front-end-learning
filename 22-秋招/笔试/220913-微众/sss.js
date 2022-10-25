function solution(arr=[1,0,1,2,0,1,3]){
  let i=0,j=0;
  while(i<j){
    if(arr[i]===0) {
      [arr[i],arr[j]]=[arr[j],arr[i]]
      
    }
  }
}