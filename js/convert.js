import state from './state.js'
import variables from './variables.js'
import {convertTime, formatToCurrency, getFullTitle} from './utils.js'
import { renderResult } from './markups.js'

export const chandleChange = ({ target: { name, value } }) => {
  state.pair = {
    ...state.pair,
    [name]: value
  }
}

export const handleInput = ({ target: { name, value } }) => {
  state[name] = Number(value)
}

const insertResult = ({
  base_code: baseCode,
  target_code: targetCode,
  conversion_rate: rate,
  conversion_result: result,
  time_last_update_utc: time }) => {
  const from = {
    code: baseCode,
    amount: state.amount,
    fullName: getFullTitle(state.codes, baseCode)
  }

  const to = {
    code: targetCode,
    amount: result,
    fullName: getFullTitle(state.codes, targetCode)
  }

  variables.resultFrom.innerHTML = renderResult(from)
  variables.resultTo.innerHTML = renderResult(to)

  const baseValue = formatToCurrency(baseCode, 1)
  const targetValue = formatToCurrency(targetCode, rate)

  variables.rateConversion.innerText = `${baseValue}  =  ${targetValue}`
  variables.rateLast.innerText = `Last updated ${convertTime(time)}`

  variables.formResult.classList.add('show')
}

export const handleSubmit = async(e) =>  {
  e?.preventDefault()

  const { url, amount, pair: { from, to } } = state

  state.loading = true
  
  if (!amount & !from & !to) return
  
  try {
    const response = await fetch(`${url}/pair/${from}/${to}/${amount}`)
    const data = await response.json()
    console.log(data);
    if (data.result === variables.success) insertResult(data)
    state.loading = false

  } catch (error) {
    console.log(error);
  }
}

export const switchCurrencies = () => {
  const { pair: { to, from } } = state

  state.pair = {
    from: to, 
    to: from,
  }
  
  if (!from & !to) return
  variables.fromSelect.value = to
  variables.toSelect.value = from
}