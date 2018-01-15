import request from 'superagent'

export const receiveWords = (words) => {
  return {
    type: "RECEIVED_WORDS",
    words
  }
}

export function getWords () {
  return (dispatch) => {
    request
      .get('api/v1/wordlists')
      .end((err, res) => {
        if (err) {
          console.error(err.message)
          return
        }
        dispatch(receiveWords(res.body))
      })
  }
}

export function getDefinition(word, callback) {
  request
    .get(`https://wordsapiv1.p.mashape.com/words/${word}`)
    .set('X-Mashape-Key', 'oNFhkeZQj2mshEl2NvNeBfE56oAvp1NQkyIjsneBibckkViKNe')
    .set('Accept', 'application/json')
    .end((err, res) => {
      // console.log(res)
      if (err) { console.log(err + 'error') }
      else { callback(JSON.parse(res.text)) }
    })
}