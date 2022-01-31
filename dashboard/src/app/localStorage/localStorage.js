export const setItem = (key, data) => {
  if (data) {
    if (typeof data === 'object') {
      localStorage.setItem(key, JSON.stringify(data))
    } else {
      localStorage.setItem(key, data)
    }
  } else {
    console.error('Không có data')
  }
}

export const getItem = (key) => {
  if (key in localStorage) {
    const value = localStorage.getItem(key)
    if (value) {
      return value
    } else {
      console.error('Không lấy được value trên local storage')
    }
  } else {
    console.error('không có keys trên local storage')
  }
}

export const removeItem = (key) => {
  if (key in localStorage) {
    localStorage.removeItem(key)
  } else {
    console.error('không có keys trên local storage')
  }
}
