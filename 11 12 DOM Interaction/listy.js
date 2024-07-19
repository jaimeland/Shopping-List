console.log('listy.js - line 1')

// tells browser to call the setupListy function when page done loading
window.addEventListener('DOMContentLoaded', setupListy)


// tracing function - seeing when function execution starts
function trace(info, start = 'TRACE:') {
  console.log(start + info)
}


// setup-oriented code     ////////////////////////////////////////////////////

function setupListy() {
  trace('setupListy')

  setupButton('add', handleAdd)
  setupButton('remove', handleRemove)
  setupButton('silly', handleSilly)

  setupListArea()

  // to speed up debugging... a "default list"
  genericAdd('bananas')
  genericAdd('milk')
  genericAdd('eggs')
}

function setupButton(buttonId, listener) {
  trace('setupButton')

  let button = document.getElementById(buttonId)
  button.addEventListener('click', listener)
}

function setupListArea() {
  trace('setupListArea')

  let listAreas = document.getElementsByClassName('listarea')
  if (listAreas) {
    let listArea = listAreas[0]
    listArea.style.marginTop = '10px'
  }
}


// add-oriented code     //////////////////////////////////////////////////////

function handleAdd() {
  trace('handleAdd')

  // get text from user
  let itemText = prompt('Item to add:')

  // if user entered text, add text to list
  if (itemText) {
    genericAdd(itemText)
  }
}

function genericAdd(text) {
  trace('genericAdd')

  // create a text node for the text
  let itemTextNode = document.createTextNode(text)

  // create item element, add text node to element
  let itemElement = document.createElement('li')
  itemElement.appendChild(itemTextNode)

  // find list element, add item element to list element
  let listElement = document.getElementById('listy')
  listElement.appendChild(itemElement)
}


// remove-oriented code     ///////////////////////////////////////////////////

const remName = 'x'
let removal = false

function handleRemove() {
  trace('handleRemove')

  let itemElements = document.getElementsByTagName('li')

  if (removal) {
    removalOff(itemElements)
  } else {
    removalOn(itemElements)
  }

}

function removalOn(itemElements) {
  trace('removalOn')

  removal = true

  for (let itemElement of itemElements) {
    let spanHTML = `<span class="${remName}"> ❌ </span>`
    itemElement.innerHTML = spanHTML + itemElement.innerHTML
    itemElement.children[0].addEventListener('click', removeItem)
  }
}

function removeItem() {
  trace('removeItem')

  // removeItem is called when a span is clicked, so
  // "this" refers to the span element node in the DOM tree
  let listItem = this.parentNode
  let list = listItem.parentNode
  list.removeChild(listItem)

  // if the last item is removed, leave removal mode automatically
  if (list.children.length == 0) {
    console.log('leaving removal mode automatically')
    removal = false
  }
}

function removalOff(itemElements) {
  trace('removalOff')

  removal = false

  for (let itemElement of itemElements) {
    let spanElement = itemElement.children[0]
    itemElement.removeChild(spanElement)
  }
}


// silly-oriented code     ////////////////////////////////////////////////////

let sillyInterval = 0

function handleSilly() {
  trace('handleSilly')

  if (sillyInterval) {
    clearInterval(sillyInterval)
    sillyInterval = 0
  }
  else {
    sillyInterval = setInterval(moveList, 20)
  }
}

function moveList() {
  trace('moveList')

  let areaElement = document.querySelector('.listarea')
  let currMargin = parseInt(areaElement.style.marginTop)
  let newMargin = calcMargin(currMargin)
  areaElement.style.setProperty('margin-top', newMargin + 'px')
}

function calcMargin(amt) {
  trace('calcMargin')

  let margin = parseInt(amt * 1.025)
  if (amt == margin) {
    margin++
  } else if (margin > window.innerHeight) {
    margin = 10
  }
  return margin
}


// end of file     ////////////////////////////////////////////////////////////
console.log('listy.js - line n')
