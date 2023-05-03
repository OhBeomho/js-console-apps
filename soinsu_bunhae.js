const readline = require("readline")
const r = readline.createInterface(process.stdin, process.stdout)

const powChars = "\u2070\u00B9\u00B2\u00B3\u2074\u2075\u2076\u2077\u2078\u2079"

r.setPrompt("숫자 입력 (q = 종료): ")
r.prompt()

r.on("line", (input) => {
  const number = Number(input)

  if (isNaN(number)) {
    if (input === "q") {
      r.close()
      return
    }

    console.log("숫자를 입력해 주세요.")
  } else if (number < 1) {
    console.log("자연수만 입력해 주세요.")
  } else {
    const factors = soinsuBunhae(number)
    let resultText = `${number} = `

    for (let i = 0; i < factors.length; i++) {
      let repeat = factors.filter((v) => v === factors[i]).length

      let pow =
        repeat !== 1
          ? String(repeat)
              .split("")
              .map((n) => powChars.charAt(Number(n)))
              .join("")
          : ""

      const numChar = factors[i] + pow
      resultText += i + (repeat - 1) === factors.length - 1 ? numChar : `${numChar} x `
      i += repeat - 1
    }

    console.log(resultText)
    r.prompt()
  }
})

function findFactor(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      return i
    }
  }

  return -1
}

function soinsuBunhae(n, previous) {
  const factor = findFactor(n)

  if (!previous) {
    previous = []
  }

  if (factor === -1) {
    previous.push(n)
    return previous
  } else {
    previous.push(factor)
    return soinsuBunhae(n / factor, previous)
  }
}
