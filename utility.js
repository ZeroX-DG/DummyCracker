function randomInt(min, max) {
  return Math.floor( Math.random() * ( max - min + 1 ) + min );
}

function randomArray(arr) {
  return arr[Math.floor(Math.random()*arr.length)];
}

function arrayEqual(arr1, arr2) {
  for(let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      return false;
    }
  }
  return true;
}