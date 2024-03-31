const productNameInput = document.getElementById('product_name')
const productPriceInput = document.getElementById('product_price')
const numberOfproduct = document.getElementById('numberofproduct')
const totalMoneyInput = document.getElementById('total_budget')
const addProductButton = document.getElementById('add_product')
const productTableBody = document.querySelector('#product_table tbody')
const totalValue = document.getElementById('total_expenses')
const remainingValue = document.getElementById('remaining_value')
const totalMoney = document.getElementById('total')
let products = []
let total = 0
let remaining = 0
let selectedProductIndex = -1
function addProduct() {
  const name = productNameInput.value.trim()
  const price = parseFloat(productPriceInput.value)
  const number = parseInt(numberOfproduct.value)
  if (name === '' || isNaN(price)) {
    alert('Please enter a valid product name and price.')
    return
  }
  products.push({
    name: name,
    TotalProductNum: number,
    price: price,
  })
  total = products.reduce(
    (acc, currentValue) =>
      acc + currentValue.price * currentValue.TotalProductNum,
    0
  )
  remaining = totalMoneyInput.value - total
  totalMoney.textContent = totalMoneyInput.value
  updateTable()
  updateTotal()
  updateRemaining()
  productNameInput.value = ''
  productPriceInput.value = ''
  numberOfproduct.value = ''
}
function updateTable() {
  productTableBody.innerHTML = ''
  for (let i = 0; i < products.length; i++) {
    const product = products[i]
    const row = document.createElement('tr')
    const nameCell = document.createElement('td')
    const priceCell = document.createElement('td')
    const actionsCell = document.createElement('td')
    nameCell.textContent =
      product.name +
      ' ' +
      '(' +
      product.TotalProductNum +
      'x' +
      product.price +
      ')'
    priceCell.textContent = product.price.toFixed(2) * product.TotalProductNum
    const editButton = document.createElement('button')
    editButton.innerHTML = '<i class="uil uil-pen"></i>'
    editButton.addEventListener('click', () => {
      selectedProductIndex = i
      productNameInput.value = product.name
      productPriceInput.value = product.price.toFixed(2)
      numberOfproduct.value = product.TotalProductNum
      addProductButton.textContent = 'Save'
    })
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = '<i class="uil uil-trash-alt"></i>'
    deleteButton.addEventListener('click', () => {
      products.splice(i, 1)
      total = products.reduce(
        (acc, currentValue) =>
          acc + currentValue.price * currentValue.TotalProductNum,
        0
      )
      remaining = totalMoneyInput.value - total
      updateTable()
      updateTotal()
      updateRemaining()
      productNameInput.value = ''
      productPriceInput.value = ''
      addProductButton.textContent = 'Add Product'
    })
    actionsCell.appendChild(editButton)
    actionsCell.appendChild(deleteButton)
    row.appendChild(nameCell)
    row.appendChild(priceCell)
    row.appendChild(actionsCell)
    productTableBody.appendChild(row)
  }
}
function updateTotal() {
  totalValue.textContent = total.toFixed(2)
}
function updateRemaining() {
  remainingValue.textContent = remaining.toFixed(2)
}
addProductButton.addEventListener('click', () => {
  if (addProductButton.textContent === 'Add Product') {
    addProduct()
  } else if (addProductButton.textContent === 'Save') {
    const selectedProduct = products[selectedProductIndex]
    selectedProduct.name = productNameInput.value.trim()
    selectedProduct.price = parseFloat(productPriceInput.value)
    selectedProduct.TotalProductNum = parseInt(numberOfproduct.value)
    console.log(selectedProduct)
    total = products.reduce(
      (acc, currentValue) =>
        acc + currentValue.price * currentValue.TotalProductNum,
      0
    )
    remaining = totalMoneyInput.value - total
    updateTable()
    updateTotal()
    updateRemaining()
    productNameInput.value = ''
    productPriceInput.value = ''
    numberOfproduct.value = ''
    addProductButton.textContent = 'Add Product'
    selectedProductIndex = -1
  }
})