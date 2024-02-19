const APIUrl =  'https://api.spaceflightnewsapi.net/v4/articles/?limit=30&title_contains=NASA';
const unFavCardContainer = document.querySelector('.card-container.unFav');
const favCardContainer = document.querySelector('.card-container.fav');
const selectsElements = document.querySelectorAll('select');

async function getDataFromApi (url) {
  let prom = fetch(url);
  return prom
  .then(data=>data.json())
  .then(data => data); 
}

function createCard (id, topic, url, imgSrc, newSite){
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
  anchorElement.innerHTML = "More...";
  const newsSite = document.createElement('span');
  newsSite.innerHTML = newSite;
  iconElement = document.createElement('i');
  iconElement.classList.add('fa','fa-thumbs-up');
  iconElement.dataset.cardId = id;
  // creating the dom tree for the element
  cardElement.appendChild(imageWrapperElement);
  imageWrapperElement.appendChild(imageElement);
  cardElement.appendChild(textWrapper);
  textWrapper.appendChild(pElement);
  textWrapper.appendChild(anchorElement);
  textWrapper.appendChild(newsSite);
  cardElement.appendChild(iconElement);
  return cardElement;
}
function createIconOnClickEvent(){
  const icons = document.querySelectorAll('.card i');
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
      populateSelect('unFav');
      populateSelect('fav');
      updateInputsText();
    });
  });
}

async function populateCardContainer(){
  const data = await getDataFromApi(APIUrl).then(data=>data);
  data.results.forEach(result => {
    const newCard = createCard(result.id, result.title, result.url, result.image_url, result.news_site);
    unFavCardContainer.appendChild(newCard);
  });
  createIconOnClickEvent();
  populateSelect('unFav');
  populateSelect('fav');
  createSelectChangeEvent();
  updateInputsText();
}

function getNewsSiteFromContainer(parentElement){
  return Array.from(document.querySelectorAll(`.card-container.${parentElement} .card .text-wrapper span`));
}

function createSelectChangeEvent(){
  selectsElements.forEach((select)=>{
    select.addEventListener('change', () =>{
      changeQtyDisplayed(select);
    });
  });
}

function changeQtyDisplayed (selectElement) {
  const parent = selectElement.classList[0].slice(7);
  const selectedValue = selectElement.options[selectElement.selectedIndex].value;
  const newsSites = getNewsSiteFromContainer(parent);
  const inputElement = document.querySelector(`.input-${parent}`);
  const quantity = newsSites.reduce((accumulator, current)=>{
    if(selectedValue === 'All'){
      return accumulator + 1;
    } else if(selectedValue === current.innerHTML){
      return accumulator + 1;
    }else
    return accumulator;
  },0);
  inputElement.value = quantity;
}

function populateSelect(parentElement){
  let newsSites = ['All'];
  const allNewsSite = getNewsSiteFromContainer(parentElement);
  allNewsSite.forEach((element) =>{
    if(!newsSites.includes(element.innerHTML)){
      newsSites.push(element.innerHTML);
    }
 });
 const selectElement = document.querySelector(`.select-${parentElement}`);
 selectElement.innerHTML = '';
 for(let i = 0; i < newsSites.length; i++){
  let optionElement = document.createElement('option');
  optionElement.text = newsSites[i];
  optionElement.value = newsSites[i];
  selectElement.add(optionElement);
 }
}

function updateInputsText() {
  selectsElements.forEach((select)=>{
    changeQtyDisplayed(select);
  });
}

populateCardContainer();