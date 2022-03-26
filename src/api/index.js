const fetchData = (url, meth, data) => {
  fetch(url, {
    method: meth,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      return res.json()
    })
    .catch(error => console.log('Error:', error))
}

export { fetchData }
