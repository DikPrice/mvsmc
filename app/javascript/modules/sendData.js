export const sendData = (url, type, data, setSuccessState, setErrorState) => {
  debugger
  fetch(url, {
    credentials: 'same-origin',
    method: type,
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      return response
    } else {
      const errorMessage = `${response.status} (${response.statusText})`
      const error = new Error(errorMessage)
      throw error
    }
  })
  .then(response => response.json())
  .then(body => {
    if (body.result["id"]) {
      debugger
      setSuccessState(body.result)
    } else {
      setErrorState(body.result)
    }
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`))
}
