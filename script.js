var header = document.querySelector("header");
var logo = document.querySelector("a");
var button = document.querySelector(".button");
var section = document.querySelectorAll("section");
var footer = document.querySelector("footer");
var article = document.querySelectorAll("article:first-child");
var canvas = document.querySelector("#myCanvas");

canvas.style.bottom = section[0].getBoundingClientRect().bottom-window.innerHeight + "px";

if (canvas.getContext("2d")) {
      var ctx = canvas.getContext('2d');

      //constructor function for elements, set of starting parameters
      function Element() {
        this.x = Math.floor(Math.random()*window.innerWidth),
        this.y =  Math.floor(1500+Math.random()*500),
        this.vertSpeed = Math.floor(5+Math.random()*5),
        this.horSpeed = Math.floor((Math.random()*2-1)*5),
        this.changeDirection = false,
        this.alpha = 1,
        this.alphaSpeed = 0.8 + Math.random()/5,
        this.color = Math.floor(Math.random()*4),
        this.angle = Math.random()*Math.PI,
        this.rotate = Math.PI/180+Math.random()*Math.PI/60,
        this.style = Math.floor(Math.random()*4) //if 0 - square, if 1 - circle, if 2 - triangle, if 3 - cross
      }

      //set quantity of elements
      var elements = [];
      for(var i = 0; i < 100; i++) {
        elements.push(new Element());
      }

      //paint and move elements
      function move() {
        ctx.clearRect(0, 0, 2500, 1500);

        //paint and move each element independently
        for(var i = 0; i < elements.length; i++) {
            ctx.lineWidth = 2;
            ctx.save();

            //color of an element
            if (elements[i].color == 0) {
              ctx.strokeStyle = "rgba(0, 0, 255, " + elements[i].alpha + ")";
            }
            else if (elements[i].color == 1) {
              ctx.strokeStyle = "rgba(0, 255, 0, " + elements[i].alpha + ")";
            }
            else if (elements[i].color == 2) {
              ctx.strokeStyle = "rgba(255, 0, 0, " + elements[i].alpha + ")";
            }
            else {
              ctx.strokeStyle = "rgba(255, 255, 0, " + elements[i].alpha + ")";
            }

            //change opacity of the element
            elements[i].alpha *= elements[i].alphaSpeed;

            //positioning of coordinates
            ctx.translate(elements[i].x, elements[i].y);
            ctx.rotate(elements[i].angle+elements[i].rotate);

            //painting of elements
            if (elements[i].style == 0) {
              ctx.beginPath();
              ctx.strokeRect(-10,-10, 20, 20);
              ctx.closePath();
            }
            else if (elements[i].style == 1) {
              ctx.beginPath();
              ctx.arc(0,0,10,0,2*Math.PI);
              ctx.closePath();
            }
            else if (elements[i].style == 2) {
              ctx.beginPath();
              ctx.moveTo(-10,5);
              ctx.lineTo(0,-12.32);
              ctx.lineTo(10,5);
              ctx.closePath();
            }
            else if (elements[i].style == 3) {
              ctx.beginPath();
              ctx.moveTo(-10,0);
              ctx.lineTo(10,0);
              ctx.moveTo(0,-10);
              ctx.lineTo(0,10);
              ctx.closePath();
            }

            ctx.stroke();

            //control of direction and speed
            if (!elements[i].changeDirection) {
              elements[i].horSpeed *= 0.98;
              if (Math.abs(elements[i].horSpeed) < 0.1) {
                elements[i].changeDirection = !elements[i].changeDirection;
                elements[i].horSpeed *= -1;
              }
            }
            else {
              elements[i].horSpeed *= 1.02;
              if (Math.abs(elements[i].horSpeed) > 1.5) {
                elements[i].changeDirection = !elements[i].changeDirection;
              }
            }
            elements[i].x += elements[i].horSpeed;
            elements[i].y -= elements[i].vertSpeed;
            elements[i].angle += elements[i].rotate;

            //reset of the element parameters
            if((elements[i].y < Math.abs(canvas.getBoundingClientRect().top))||(elements[i].alpha <0.05)) {
              elements[i].x = Math.floor(Math.random()*window.innerWidth),
              elements[i].y =  Math.floor(1500+Math.random()*500),
              elements[i].vertSpeed = Math.floor(5+Math.random()*5),
              elements[i].horSpeed = Math.floor((Math.random()*2-1)*5),
              elements[i].changeDirection = false,
              elements[i].alpha = 1,
              elements[i].alphaSpeed = 0.8 + Math.random()/5,
              elements[i].color = Math.floor(Math.random()*4),
              elements[i].angle = Math.random()*Math.PI,
              elements[i].rotate = Math.PI/180+Math.random()*Math.PI/60
            }
            ctx.restore();
          }
          requestAnimationFrame(move);
        }
      requestAnimationFrame(move);
    }

button.addEventListener("click", function() {
  button.classList.add("button-border");
  var int = 0;
  for (var i = 0; i < section.length; i++) {
    if (section[i].getBoundingClientRect().bottom > window.innerHeight+header.clientHeight) {
      int = setInterval(function(){
        scrollTo(0, scrollY + 10);
        if (scrollY + header.clientHeight >= section[i].offsetTop) clearInterval(int);
      }, 1);
      return;
    }
  }
})

addEventListener("scroll", function() {
  if (header.getBoundingClientRect().top > document.body.getBoundingClientRect().top + 40) {
    header.classList.add("header-shadow");
    logo.classList.add("header-logo");
  }
  else {
    header.classList.remove("header-shadow");
    logo.classList.remove("header-logo");
  }
  if (section[section.length-2].getBoundingClientRect().bottom < window.innerHeight){
    button.classList.add("button-scale");
  }
  else {
    button.classList.remove("button-scale");
  }
  // for(let i = 0; i < article.length; i++){
  //     article[i].style.top = scrollY- window.innerHeight*i+"px";
  // }

  //freeze position of sections
  for (var i = 1; i < section.length; i++) {
    if (section[i].getBoundingClientRect().top <= window.innerHeight+header.clientHeight) {
      section[i-1].style.top = scrollY - window.innerHeight*(i-1)+ "px";
    }
    else {
      section[i-1].style.top = 0;
    }
  }
})

// button.addEventListener("click", function() {
//   button.classList.add("button-border");
//   var int = 0;
//   for(var i = 0; i < section.length; i++) {
//     if (section[i].getBoundingClientRect().bottom > window.innerHeight/3) {
//       int = setInterval(function(){
//         scrollTo(0, scrollY + 10);
//         if (scrollY + header.clientHeight >= section[i+1].offsetTop) clearInterval(int);
//       }, 1);
//       break;
//     }
//   }
// })
