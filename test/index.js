function test(index, string) {
  let returnString;
  if (index == 1) {
      if (string.length < 2) {
         return '分支1';
      }
      returnString = "returnString1";
  } else if (index == 2) {
      if (string.length < 5) {
         return '分支2';
      }
      returnString = "returnString2";
  } else {
     return  '分支3'
  }
  return returnString;
}