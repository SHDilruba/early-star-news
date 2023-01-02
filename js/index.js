
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
  });
};
 loadNewsList('');

 const loadNews = async(category_id) =>{
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
  toggleSpinner(true);
  try{
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
  }
  catch(error){
      console.log(error);
  }
};
//============== news display section ===================
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
  toggleSpinner(false);
};

//============== modal section ===================
const loadNewsDetail = async (news_id) =>{
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  toggleSpinner(true);
  try{
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data[0]);
  }
  catch(err){
      console.log(err);
  }
}

const displayNewsDetails = news =>{
  const modalTitle = document.getElementById('exampleModalLabel');
  modalTitle.innerText = news.title;
  const newsCover = document.getElementById('image');
  newsCover.src = news.image_url;
  const newsDetails = document.getElementById('newsDetails');
  newsDetails.innerText = `${news.details.slice(0, 280) + ' ' + '.....'}`;
  const authorImg = document.getElementById('author-image');
  authorImg.src = news.author.img;
  const authorName = document.getElementById('author-name');
  authorName.innerText = `${news.author.name ? news.author.name : 'name is unavailable'}`;
  const  publishedDate = document.getElementById('para');
  publishedDate.innerText = `${news.author.published_date ? news.author.published_date : 'date is unavailable' }`;
  const countView = document.getElementById('count-view');
  countView.innerText = `${news.total_view ?
    news.total_view 
  : 
  'no data available'}`;
   toggleSpinner(false);
};
//============== spinner section ===================
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
     loaderSection.classList.remove('d-none');
  }
  else{
     loaderSection.classList.add('d-none');
  }
};
// loadNewsDetail();