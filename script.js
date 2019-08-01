console.log("script.js");

let url =
  "https://newsapi.org/v2/top-headlines?country=us&apiKey=3474dd4797ca45dbac85a0631f18ac1d";
let newsArray = [];
async function getNews() {
  const response = await fetch(url);
  const jsonDataObject = await response.json();
  // console.log(`jsonDataObject: ${jsonDataObject}`);
  // console.log(
  //   "line-9-jsonDataObject.aritiles[0]:",
  //   jsonDataObject.articles.length
  // );

  // console.log("line-15-add more news", jsonDataObject.articles);
  newsArray.push(...jsonDataObject.articles);
  console.log("line-17-add newsArray", newsArray);
  renderNews(newsArray);
}

function renderNews(newsArray) {
  document.getElementById("articlesLoaded").innerHTML = ` ${newsArray.length}`;
  const newsHTML = newsArray.map(el => {
    return createHtmlTemplate(el);
  });
  document.getElementById("newsContent").innerHTML = newsHTML.join("");
}

function createHtmlTemplate(el) {
  // console.log(`line 16 render Ariticle`);
  // console.log("Line-19-el.Title.", el.title);
  // console.log("Line-20-el.Description.", el.description);
  // console.log("Line-21-el.Title.", el.source.name);
  // console.log("Line-22-el.Description.", el.urlToImage);
  // console.log("Line-23-el.Title.", el.url);
  // console.log("Line-24-el.Description.", el.title);
  return `        
  <div class="row d-flex mt-2 justify-content-center">
      <div class="card" style="width: 35rem;">
          <img class="card-img-top" src="${el.urlToImage}" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${el.title}</h5>
            <span class="d-flex"><p class="card-text">${moment(
              el.publishedAt
            ).format("MMM Do YY")} -- ${moment(el.publishedAt)
    .startOf("day")
    .fromNow()}  </p> <p class="card-text ml-3">Source: ${
    el.source.name
  }</p></span>
            <p class="card-text">${el.description}</p>
           
            <a href="${el.url}" class="btn btn-info">Read More</a>
          </div>
        </div>
  </div>
  `;
  // console.log("line-17-jsonDataObject.aritiles:", jsonDataObject.articles);
  // jsonDataObject.articles.map(el => {
  //   console.log("line - 22: element", el.title);
  //   console.log("line - 23: element", el.description);
  // });
}
getNews();
