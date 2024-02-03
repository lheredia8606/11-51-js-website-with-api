const APIUrl =  'https://api.spaceflightnewsapi.net/v4/articles/?limit=30&title_contains=NASA';
const unFavCardContainer = document.querySelector('.card-container.unFav');
const favCardContainer = document.querySelector('.card-container.fav');

async function getDataFromApi (url) {
  let prom = fetch(url);
  return prom
  .then(data=>data.json())
  .then(data => data); 
}

function createCard (id, topic, url, imgSrc){
  const cardElement = document.createElement('div');
  cardElement.id = id;
  cardElement.classList.add('card');
  const imageWrapperElement = document.createElement('div');
  imageWrapperElement.classList.add('image-wrapper');
  const imageElement = document.createElement('img');
  imageElement.src = imgSrc;
  imageElement.alt = "New's Photo";
  const textWrapper = document.createElement('div');
  textWrapper.classList.add('text-wrapper');
  const pElement = document.createElement('p');
  pElement.innerHTML = topic + ' ';
  const anchorElement = document.createElement('a');
  anchorElement.href = url;
  anchorElement.target = 'blank';
  anchorElement.innerHTML = "More..."
  iconElement = document.createElement('i');
  iconElement.classList.add('fa','fa-thumbs-up');
  iconElement.dataset.cardId = id;
  // creating the dom tree for the element
  cardElement.appendChild(imageWrapperElement);
  imageWrapperElement.appendChild(imageElement);
  cardElement.appendChild(textWrapper)
  textWrapper.appendChild(pElement);
  textWrapper.appendChild(anchorElement)
  cardElement.appendChild(iconElement);
  return cardElement;
}
function createIconOnClickEvent(){
  const icons = document.querySelectorAll('i');
  icons.forEach(icon =>{
    icon.addEventListener('click', e =>{
      const  target = e.target;
      const cardElement = document.getElementById(target.dataset.cardId);
      if(target.classList.contains('fa-thumbs-up')){
        target.classList.remove('fa-thumbs-up');
        target.classList.add('fa-thumbs-down');
        unFavCardContainer.removeChild(cardElement);
        favCardContainer.appendChild(cardElement);
      } else{
        target.classList.add('fa-thumbs-up');
        target.classList.remove('fa-thumbs-down');
        favCardContainer.removeChild(cardElement);
        unFavCardContainer.appendChild(cardElement);
      } 
    });
  });
}

async function populateCardContainer(){
  const data = await getDataFromApi(APIUrl).then(data=>data);
  data.results.forEach(result => {
    console.log(result);
    const newCard = createCard(result.id, result.title, result.url, result.image_url);
    unFavCardContainer.appendChild(newCard);
  });
  createIconOnClickEvent();
}

populateCardContainer();
console.log('done');
// const newCard = createCard(topic, newsUrl, imageSrc);
// cardContainer.appendChild(newCard);