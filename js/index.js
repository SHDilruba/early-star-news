
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
  <li>
     <a class="nav-link", onclick="loadNews('${news.category_id}')" href="#">${news.category_name}</a>
  </li>
  `;
  ulList.appendChild(newsListDisplay)
  })
};
 loadNewsList('');

 const loadNews = async(category_id) =>{
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  try{
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
  }
  catch(error){
      console.log(error);
  }
}
const displayNews = allNews =>{
  const quantity = document.getElementById('news-item');
  quantity.innerText = `${allNews.length ? 
    allNews.length + ' ' + 'news found for this category' : 
    'no news found for this category'}`;

  const newsDisplayContainer = document.getElementById('news-display-container');
   newsDisplayContainer.innerHTML = '';
   allNews.sort((a,b) => a.total_view < b.total_view ? 1 : -1).forEach(newsPost =>{
  const newsDisplay = document.createElement('div');
  newsDisplay.innerHTML = `
 <div class="card mb-5" style="width: 100">
  <div class="row">
    <div class="col-lg-4">
      <img src="${newsPost.image_url}" class="img-fluid h-100 rounded py-lg-5 ps-lg-5" alt="...">
    </div>
     <div class="col-lg-8">
      <div class="card-body py-5 pe-5 ps-sm-5 ps-lg-3">
        <h4 class="card-title pb-3">${newsPost.title}</h4>
         <p class="card-text mb-4">${newsPost.details.slice(0, 400) + ' ' + '.....'}</p>
          <div id="author-div" class="ps-3 pe-5">
          <div class="d-flex">          
           <img id="author-image" src="${newsPost.author.img}"          
             <div>
               <span><p>${newsPost.author.name ? newsPost.author.name : 'no data available'}</p>
                 <p id="para">${newsPost.author.published_date ? newsPost.author.published_date : 'date is not available'} </p> 
               </span>
             </div>        
              <span id="view-font" ><i class="fa-solid fa-eye"></i>
               ${newsPost.total_view ?
                newsPost.total_view 
              : 
              'no data available'}
              </span> 
              <span> 
                  <button id="detail-btn" onClick="loadNewsDetail('${newsPost._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" >
                  Details
                  </button>
              </span>
                    </div>
`;
newsDisplayContainer.appendChild(newsDisplay)
});
};
// loadNews();