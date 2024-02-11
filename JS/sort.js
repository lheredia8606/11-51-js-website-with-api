const buttons = document.querySelectorAll('.btn-container button');
buttons.forEach((button)=>{
  button.addEventListener('click', (e) =>{
    sort(e.target);
    });
});

function sort (target){
  const container = target.dataset['container'] || target.parentNode.dataset['container'];
  const direction = target.dataset['direction'] || target.parentNode.dataset['direction'];
  const cardContainer = document.querySelector(`.card-container.${container}`)
  const arrElements = Array.from(cardContainer.children);
  arrElements.sort((a,b)=>{
    comparison = direction === 'asc' ?
    a.getElementsByTagName('p')[0].innerHTML.localeCompare(b.getElementsByTagName('p')[0].innerHTML):
    b.getElementsByTagName('p')[0].innerHTML.localeCompare(a.getElementsByTagName('p')[0].innerHTML);
    return comparison;
  });
  repopulateContainer(cardContainer, arrElements);
}

function repopulateContainer(container, elements){
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  elements.forEach(element => {
    container.appendChild(element);
  });
}