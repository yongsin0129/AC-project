// 3.變數宣告
const container = document.querySelector('.container')
const menu = document.getElementById('menu')
const cart = document.getElementById('cart')
const totalAmount = document.getElementById('total-amount')
const button = document.getElementById('submit-button')
const modalBody = document.querySelector('.modal-body')
const modalFooter = document.querySelector('.modal-footer')
let productData = []
let cartItems = []
let total = 0

// 4.GET API 菜單產品資料
// https://ac-w3-dom-pos.firebaseio.com/products.json API 位置
axios
  .get('https://ac-w3-dom-pos.firebaseio.com/products.json')
  .then((res) => {
    productData = res.data
    displayProduct(productData)
  })
  .catch((err) => {
    console.log(err)
  })

function displayProduct (products) {
  products.forEach((product) =>
    (menu.innerHTML += `
    <div class="col-3">
      <div class="card text-center">
        <img src=${product.imgUrl} class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.price}</p>
          <a href="#" class="btn btn-primary add-to-cart" data-id=${product.id}>加入購物車</a>
        </div>
      </div>
      </div>
  `)
  )
}

// 6.加入購物車
function addToCart (event) {
  const target = event.target
  // 找到觸發event的node元素，並得到其產品id
  const selectedId = target.dataset.id
  // 在productData的資料裡，找到點擊的產品資訊，加入 cartItems
  const selectedProduct = productData.find((product) => {
    return product.id === selectedId
  })
  // 加入購物車變數cartItems 分：有按過、沒按過
  const existCartItem = cartItems.find((item) => item.id === selectedId)
  if (existCartItem) {
    existCartItem.quantity++
  } else {
    cartItems.push({
      id: selectedProduct.id,
      name: selectedProduct.name,
      price: selectedProduct.price,
      quantity: 1
    })
  }
  // 畫面顯示購物車清單及總金額
  updateCartAndTotalNumber()
}
// 8.送出訂單
function submit () {
  modalBody.innerHTML = ''
  cartItems.forEach((item) => {
    modalBody.innerHTML += `<li class="list-group-item">${item.name} X ${item.quantity} : 小計 ${item.quantity * item.price
      } </li>`
  })
  modalBody.innerHTML += `<li class="list-group-item">總金額 : ${total}</li>`
}

// 9.重置資料
function reset () {
  cartItems = []
  total = 0
  cart.innerHTML = ''
  totalAmount.innerHTML = `${total}`
}

// 10. 加入事件監聽
container.addEventListener('click', function (event) {
  if (event.target.matches('.add-to-cart')) {
    addToCart(event)
  } else if (event.target.matches('#submit-button')) {
    submit()
  } else if (event.target.matches('.fa-plus-circle')) {
    updateNumberAndPrice(event, 'plus')
  } else if (event.target.matches('.fa-minus-circle')) updateNumberAndPrice(event, 'minus')
})
modalFooter.addEventListener('click', (event) => {
  if (event.target.matches('.btn-pay-bill')) {
    reset()
  }
})

// Cart 的數量及金額計算 (使用 method 來控制加法 or 減法)
function updateNumberAndPrice (event, method) {
  const target = event.target
  // 找到觸發event的node元素，並得到其產品id
  const selectedId = target.dataset.id
  cartItems.forEach((item, index) => {
    if (item.id === selectedId && method === 'plus') {
      item.quantity++
      // 如果要減去的商品數量剩一個時，直接將商品移除 Cart
    } else if (item.id === selectedId && method === 'minus' && item.quantity === 1) {
      // index = cartItems.findIndex(item => item.id === selectedId)
      cartItems.splice(index, 1)
    } else if (item.id === selectedId && method === 'minus') {
      item.quantity--
    }
  })
  updateCartAndTotalNumber()
}

// 畫面顯示購物車清單及總金額
function updateCartAndTotalNumber () {
  cart.innerHTML = ''
  // cart.innerHTML = ''
  // cart.innerHTML += cartItems.map(item => {
  //   return `<li class="list-group-item">${item.name} X ${item.quantity} : 小計 ${item.quantity * item.price} </li>`
  // }).join('')
  cartItems.forEach((item) => {
    cart.innerHTML += `
    <li class="list-group-item position-relative">
    ${item.name} X ${item.quantity} : 小計 ${item.quantity * item.price}
    <span class="fa fa-minus-circle fs-3 float-end" data-id=${item.id}></span>
    <span class="fa fa-plus-circle fs-3 float-end" data-id=${item.id}></span>
    </li>
    `
  })
  total = cartItems.reduce((prev, item) => {
    return prev + item.quantity * item.price
  }, 0)
  totalAmount.innerHTML = `${total}`
}
