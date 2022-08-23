window.addEventListener('load', function(){
  get_courses("python");
});
window.addEventListener('resize', function(){
  let x=document.getElementsByClassName("active");
  get_courses(x[0].innerHTML.toLowerCase());
});

function searchButton() {
  let search_ele = document.getElementById("inputSearch").value;
  Elementofcource = document.getElementById("cards-items");
  Elementofcource.innerHTML = "";
  let x = document.getElementsByClassName("active");
  loaditems(x[0].innerHTML.toLowerCase(), search_ele.toLowerCase());
}

function descriptionhtml(header, description, tag) {
  Elementofcource = document.getElementById("discription1");
  Elementofcource.innerHTML = "";
  let CourseHTML =
    `
        <h2 class="marginrl">` +
    header +
    `</h2>
        <p class="marginrl ">` +
    description +
    `</p>
        <button type="button" class="explore marginrl fw-bold">Explore ` +
    tag +
    `</button>
    `;
  Elementofcource.innerHTML = CourseHTML;
}
function itemshtml(image, title, author, price, active = false, z, test) {
  if (test == false) {
    let numberOFItem = "test";
    numberOFItem += z.toString();
    Elementofcource = document.getElementById(numberOFItem);
    let items =
      `
        <article class="card1 ">
                   <a  href="/course/learning-python-for-data-analysis-and-visualization/"><img
                   src="` +
      image +
      `" alt="pyhon" />
                 <h3>` +
      title +
      `</h3>
                 <h4 class="color-p">` +
      author +
      `</h4>
                 <div>
                   <span class="checked">` +
      price +
      `</span>
                   <span class="fa fa-star checked"></span>
                   <span class="fa fa-star checked"></span>
                   <span class="fa fa-star checked"></span>
                   <span class="fa fa-star checked"></span>
                   <span class="fa fa-star-half-full checked"></span>
                   <span class="color-p">(17.972)</span>
                 </div>
                 <h5>E£1.599.99</h5>
               </a>
               </article>
                   `;
    Elementofcource.innerHTML += items;
  } else {
    let numberOFItem = "test";
    numberOFItem += z.toString();
    Elementofcource = document.getElementById("cards-items");
    let flageActive = "";
    if (active == true) {
      flageActive = "active";
    } else flageActive = "";
    let CourseHTML =
      `<div class="carousel-item  ` +
      flageActive +
      ` " id="` +
      numberOFItem +
      `">
            
 <article class="card1 ">
            <a  href="/course/learning-python-for-data-analysis-and-visualization/"><img
            src="` +
      image +
      `" alt="pyhon" />
          <h3>` +
      title +
      `</h3>
          <h4 class="color-p">` +
      author +
      `</h4>
          <div>
            <span class="checked">` +
      price +
      `</span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star-half-full checked"></span>
            <span class="color-p">(17.972)</span>
          </div>
          <h5>E£1.599.99</h5>
        </a>
        </article>
            
            </div>`;
    Elementofcource.innerHTML += CourseHTML;
  }
}

function get_courses(tag, searchword = "") {
  fetch("http://localhost:3000/content")
    .then((res) => res.json())
    .then((json) => {
      Object.entries(json).forEach(([key, value]) => {
        let header = value["header"];
        let description = value["description"];
        if (key.toLowerCase() == tag.toLowerCase()) {
          Elementofcource = document.getElementById("cards-items");
          Elementofcource.innerHTML = "";
          descriptionhtml(header, description, tag);
          let wth = window.innerWidth;
          if (wth > 980) {
            wth = 5;
          } else if (wth > 700) {
            wth = 3;
          } else {
            wth = 1;
          }
          let cnt = -1;
          let x = wth;
          let z = 0;
          let activ = false;
          Object.entries(value).forEach(([key1, value1]) => {
            if (key1 == "courses") {
              Object.entries(value1).forEach(([key2, value2]) => {
                let title = value2["title"];
                if (
                  title.toLowerCase().includes(searchword.toLowerCase()) ||
                  searchword == ""
                ) {
                  cnt++;
                  if (cnt >= x) {
                    z++;
                    x += wth;
                  }
                  if (cnt == 0) {
                    activ = true;
                  } else {
                    activ = false;
                  }
                  let image = value2["image"];
                  let price = value2["price"];
                  let auther = "";
                  Object.entries(value2["instructors"]).forEach(
                    ([key3, value3]) => {
                      let x = value3["name"];
                      auther = auther + x;
                      auther += ", ";
                    }
                  );
                  let test = false;
                  if ((cnt >= wth && cnt % wth == 0) || cnt == 0) {
                    test = true;
                  }
                  itemshtml(image, title, auther, price, activ, z, test);
                }
              });
            }
          });
        }
      });
    });
}
