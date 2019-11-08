export const fetchData = (url, setStateValue) => {
  fetch(url, {
    credentials: 'same-origin',
    })
    .then((response) => {
      if (response.ok) {
        return response
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
          error = new Error(errorMessage)
        throw(error)
      }
    })
    .then(response => response.json())
    .then(body => {
      setStateValue(body)
    })
    .catch(error => console.error(`Error in fetch: ${error.message}`))
}

// Note body can hav varibale content depending on component
