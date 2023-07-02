import variables from './variables.js'
import { fetchCodes, handleTabClick } from './index.js'
import { handleInput, handleSubmit, switchCurrencies } from './convert.js'
import { handleActionClick, handleSingleSelectChange, addCurrency, handleAddSelectChange } from './single.js'

const {
  amountInput,
  form,
  switchBtn,
  tabs,
  currentCurrency,
  currentCurrencyList,
  singleSelect,
  addBtn,
  addCurrencySelect,
} = variables

fetchCodes()
amountInput.addEventListener('keyup', handleInput)

form.addEventListener('submit', handleSubmit)

switchBtn.addEventListener('click', switchCurrencies)

tabs.forEach(tab => tab.addEventListener('click', handleTabClick))

currentCurrency.addEventListener('click', handleActionClick)

currentCurrencyList.addEventListener('click', handleActionClick)

singleSelect.addEventListener('change', handleSingleSelectChange)

addBtn.addEventListener('click', addCurrency)

addCurrencySelect.addEventListener('change', handleAddSelectChange)

