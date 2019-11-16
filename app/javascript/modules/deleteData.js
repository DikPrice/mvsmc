export const deleteData = (url, setSuccessState, setErrorState) => {
  debugger
  fetch(url, {
    credentials: 'same-origin',
    method: "DELETE",
    body: JSON.stringify(""),
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
    if (body.result == "Deleted") {
      setSuccessState(body.result)
    } else {
      setErrorState(body.result)
    }
  })
  .catch(error => console.error(`Error in fetch: ${error.message}`))
}
