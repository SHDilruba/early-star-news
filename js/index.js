
const loadNewsList = async() =>{
  const url = ('https://openapi.programming-hero.com/api/news/categories');
  try{
    const res = await fetch(url);
    const data = await res.json();
    displayNewsList(data.data.news_category);
  }
  catch (err) {
      console.log(err);
  }
}
 const displayNewsList = newses =>{
 const ulList = document.getElementById('ul-list');
  newses.forEach(news =>{
 const newsListDisplay = document.createElement('ul')
  newsListDisplay.classList.add('nav-item')
  newsListDisplay.innerHTML = `
  <li onclick="spinner()">
     <a class="nav-link", onclick="loadNews('${news.category_id}')" href="#">${news.category_name}</a>
  </li>
  `;
  ulList.appendChild(newsListDisplay)
  })
};
 loadNewsList('');