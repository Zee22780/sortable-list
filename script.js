/*-------------------------------- Constants --------------------------------*/
const bestPlaces = [
  "Italy",
  "Portugal",
  "Japan",
  "Amsterdam",
  "Spain",
  "South Africa",
  "Barbados",
  "Germany",
  "Istanbul",
  "France",
]

const listItems = []
let dragStartIndex


/*---------------------------- Variables (state) ----------------------------*/

/*------------------------ Cached Element References ------------------------*/
const draggableList = document.getElementById("draggable-list")
const check = document.getElementById("check")

/*----------------------------- Event Listeners -----------------------------*/
function addEventListener() {
  const draggables = document.querySelectorAll('.draggable')
  const dragListItems = document.querySelectorAll('.draggable-list li')

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', dragStart)
  })

  dragListItems.forEach(item => {
    item.addEventListener('dragover', dragOver)
    item.addEventListener('drop', dragDrop)
    item.addEventListener('dragenter', dragEnter)
    item.addEventListener('dragleave', dragLeave)
  })
}

check.addEventListener('click', checkOrder)
/*-------------------------------- Functions --------------------------------*/
createList()

function createList(){
  [...bestPlaces]
  .map(a  => ({ value: a, sort: Math.random()}))
  .sort((a,b) => a.sort - b.sort)
  .map(a => a.value)
  .forEach((place, index) => {
    const listItem = document.createElement('li')


    listItem.setAttribute('data-index', index)

    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable = "true">
      <p class="place-name">${place}</p>
      <i class="fa-solid fa-grip-lines"></i>
      </div>
    `

    listItems.push(listItem)

    draggableList.appendChild(listItem)
  })
  addEventListener()
}

function dragStart() {
  dragStartIndex = +this.closest('li').getAttribute('data-index')
}

function dragEnter() {
  this.classList.add('over')
}

function dragOver(e) {
  e.preventDefault()
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute('data-index')

  swapItems(dragStartIndex, dragEndIndex)

  this.classList.remove('over')
}

function dragLeave() {
  this.classList.remove('over')
}

function swapItems(fromIndex, toIndex) {
  const itemOne = listItems[fromIndex].querySelector('.draggable')
  const itemTwo = listItems[toIndex].querySelector('.draggable')

  listItems[fromIndex].appendChild(itemTwo)
  listItems[toIndex].appendChild(itemOne)
}

function checkOrder() {
  listItems.forEach((listItem, index) => {
    const placeName = listItem.querySelector('.draggable').innerText.trim()

    if(placeName !== bestPlaces[index]){
      listItem.classList.add('wrong')
    }
    else {
      listItem.classList.remove('wrong')
      listItem.classList.add('right')
    }
  })
}

