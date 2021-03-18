/* CONTROLE DE GASTOS */
const transactionUl = document.querySelector('#transactions')
const totalDisplay = document.querySelector('#balance')
const incomeDisplay = document.querySelector('#money-plus')
const expenseDisplay = document.querySelector('#money-minus')
const form = document.querySelector('#form')
const inputTransactionName = document.querySelector('#text')
const inputTransactionAmount = document.querySelector('#amount')
const inputTransactionQnt = document.querySelector('#qnt')

const localStorageTransactions = JSON.parse(localStorage
    .getItem('trueTransactions'))
let trueTransactions = localStorage
    .getItem('trueTransactions') !== null ? localStorageTransactions : []

const removeId = ID => {
    trueTransactions = trueTransactions.filter(transaction =>
        transaction.id !== ID)
    updateLocalStorage()
    init()
}

const addTransactionIntoDOM = ({ amount, qnt, name, id }) => {
    const operator = amount < 0 ? '-' : '+';
    const CSSClass = amount < 0 ? 'minus' : 'plus';
    const quantity = qnt
    const amountNoOperator = Math.abs(amount * quantity)
    const li = document.createElement('li');

    li.classList.add(CSSClass)
    li.innerHTML = `
    ${name} 
    <span>${operator} R$ ${amountNoOperator}</span>
    <button class="delete-btn" onClick="removeId(${id})">x</button
    `
    transactionUl.append(li)
}

const getTotalAmount = transactionsAmounts =>
    transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction.total, 0)
        .toFixed(2)


const getIncome = transactionsAmounts =>
    transactionsAmounts
        .filter(value => value.total > 10)
        .reduce((accumulator, value) => accumulator + value.total, 0)
        .toFixed(2)


const getExpense = transactionsAmounts =>
    Math.abs(transactionsAmounts
        .filter(value => value.total < 10)
        .reduce((accumulator, value) => accumulator + value.total, 0))
        .toFixed(2)


const updateBalanceValue = () => {
    const transactionsAmounts = trueTransactions.map(transaction => {
        return {
            total: transaction.amount * transaction.qnt
        }
    })
    const totalAmount = getTotalAmount(transactionsAmounts)
    const income = getIncome(transactionsAmounts)
    const expense = getExpense(transactionsAmounts)

    totalDisplay.textContent = `R$ ${totalAmount}`;
    incomeDisplay.textContent = `R$ ${income}`;
    expenseDisplay.textContent = `R$ ${expense}`;
}

const init = () => {
    transactionUl.innerHTML = ``
    trueTransactions.forEach(addTransactionIntoDOM)
    updateBalanceValue()
}

init()

const updateLocalStorage = () => {
    localStorage.setItem('trueTransactions', JSON.stringify(trueTransactions))
}

const createID = () => Math.round(Math.random() * 1000)

const addTransactionArray = (transactionName, transactionAmount, transactionQnt) => {
    trueTransactions.push({
        id: createID(),
        name: transactionName,
        amount: Number(transactionAmount),
        qnt: Number(transactionQnt)
    })
}

const cleanInputs = () => {
    inputTransactionAmount.value = ''
    inputTransactionName.value = ''
    inputTransactionQnt.value = '1'
}

const formEvent = event => {
    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()
    const transactionQnt = inputTransactionQnt.value.trim()
    const inputEmpty = transactionName === '' || transactionAmount === '' || transactionQnt === ''

    if (inputEmpty) {
        alert('Preencha todos os campos!!')
        return
    }

    addTransactionArray(transactionName, transactionAmount, transactionQnt)
    init()
    updateLocalStorage()
    cleanInputs()
}

form.addEventListener('submit', formEvent)





