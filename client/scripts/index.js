import "~/styles/index.styl"
import axios from "axios"
window.axios = axios
document.body.style.display = "block"
document.body.classList.add("fade-in")

const generateNumberForm = document.getElementById("generate-num-form")
const dedupeForm = document.getElementById("dedupe_form")
const textarea = document.getElementById("textarea")
const generateNumberInput = document.getElementById("generate_number_input")
const generateNumberBtn = document.getElementById("generate_number_btn")
const elapsedTimeResult = document.getElementById("elapsed-time")
const elapsedMillisResult = document.getElementById("elapsed-millisecond")
const dedupedArrResult = document.getElementById("deduped-array")
const duplicateCountResult = document.getElementById("duplicate-count")
const dedupeArrBtn = document.getElementById("dedupe-array-btn")

const rand = (() => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  return (size = 12, optChars) => {
    const srcStr = chars + (optChars || "")
    let randomChars = "";

    for (let i = 0; i < size; i++)
      randomChars += srcStr.charAt(Math.floor(Math.random() * srcStr.length));

    return randomChars;
  }
})()

function generateFakeEmail() {
  const nameLength = Math.floor(Math.random() * 8) + 4
  const domainLength = Math.floor(Math.random() * 8) + 3
  return rand(nameLength) + "@" + rand(domainLength) + ".com"
}

function generateArray(number) {
  const strings = []
  for (let i = 0; i < number; i++)
    strings.push(generateFakeEmail())
  return strings
}

generateNumberForm.addEventListener("submit", evt => {
  evt.preventDefault()
  generateNumberBtn.classList.add("processing")
  const value = generateNumberInput.value
  const arr = generateArray(parseInt(value))
  textarea.value = JSON.stringify(arr)
  generateNumberBtn.classList.remove("processing")
})

dedupeForm.addEventListener("submit", evt => {
  evt.preventDefault()
  if (dedupeArrBtn.classList.contains("processing"))
    return console.log("in progress...")

  dedupeArrBtn.classList.add("processing")
  setTimeout(() => {
    const arr = textarea.value
    axios.post("/dedupe", {data: JSON.parse(arr)})
    .then(res => {
      const elapsedMilli = res.data.elapsed_milliseconds
      elapsedTimeResult.textContent = res.data.elapsed_time
      elapsedMillisResult.textContent = elapsedMilli <= 0 ? "less than 0" : elapsedMilli
      dedupedArrResult.textContent = JSON.stringify(res.data.deduped_array, null, " ")
      duplicateCountResult.textContent = res.data.duplicate_count
      dedupeArrBtn.classList.remove("processing")
    })
    .catch(reqErr => console.error("reqErr: ", reqErr))
  }, 100)
})
