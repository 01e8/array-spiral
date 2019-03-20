
let startDomArray = function(array) {
  let height = array.length;
  let width = array[0].length;
  let domArray = $('.array');
  let flexBasisElement = Math.floor(100 / width);
  domArray.text('');
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      domArray.append(`<div class="array_element" data-i="${i}" data-j="${j}">${array[i][j]}</div>`);
    }
  }
  let lengthMaxNumber = (height * width).toString().length;
  let sizeElement = 10 + (lengthMaxNumber * 15);
  $('.array_element').css({
    'flex-basis': flexBasisElement + '%',
    'height': sizeElement + 'px'
  });
  domArray.css({'width': width * sizeElement + "px"});
};

let elementRed = function(i, j) {
  $(`.array_element[data-i=${i}][data-j=${j}]`).css({'background-color': '#ff5875'});
};

let snakeIt = function(top, left, move, array) {
  let height = array.length;
  let width = array[0].length;
  let border = {
    top: -1,
    right: width,
    bottom: height,
    left: -1
  };
  let element = {
    i: (top) ? 0 : height - 1,
    j: (left) ? 0 : width - 1
  };
  let vector = {
    x: (top ^ left ^ move) * ((!((move && top) || (!move && left)) * (-1)) || 1),
    y: !(top ^ left ^ move) * ((!((move && top) || (!move && left)) * (-1)) || 1)
  };

  let t = 0;
  let maxT = (height * width);
  setTimeout(function run() {
    elementRed(element.i, element.j);
    console.log(array[element.i][element.j]);
    element.i += vector.y;
    element.j += vector.x;
    if ((element.i + vector.y) === border.top || (element.i + vector.y) === border.bottom){
      vector.y = 0;
      if ((element.j - 1) !== border.left){
        vector.x = -1;
        border.right--;
      } else if ((element.j + 1) !== border.right){
        vector.x = 1;
        border.left++;
      }
    }
    if ((element.j + vector.x) === border.left || (element.j + vector.x) === border.right){
      vector.x = 0;
      if ((element.i - 1) !== border.top){
        vector.y = -1;
        border.bottom--;
      } else if ((element.i + 1) !== border.bottom){
        vector.y = 1;
        border.top++;
      }
    }
    t++;
    if (t < maxT){
      setTimeout(run, 100);
    }
  }, 100);
};

$(document).ready(function(){
  array = [
    [0, 1, 2, 3, 4, 5],
    [19, 20, 21, 22, 23, 6],
    [18, 31, 32, 33, 24, 7],
    [17, 30, 35, 34, 25, 8],
    [16, 29, 28, 27, 26, 9],
    [15, 14, 13, 12, 11, 10]
  ];
  startDomArray(array);
  snakeIt(true, true, true, array);
});
