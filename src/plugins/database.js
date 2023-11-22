//use localstorage to store data
const STORAGE_KEY = 'travel_location'

export function getLocaltion(id) {
  const data = getAllLocaltion()
    if (data) {
        const filterData = data.filter(item => item.id === id)
        return filterData.length > 0 ? filterData[0] : null
    } else {
        return null
    }
}

export function setLocaltion(id, value) {
    let data = getAllLocaltion() || []
    // consider the id idx if exist

    const idx = data.findIndex(item => item.id === id)
    // if idx exist, replace the value
    if (idx > -1) {
        data.splice(idx, 1, value)
    } else {
        data.push(value)
    }
    setAllLocaltion(data)
}

export function getAllLocaltion() {
    const data = localStorage.getItem(STORAGE_KEY)
    if (data) {
        return deserialize(data)
    } else {
        return null
    }
}

function setAllLocaltion(data) {
    localStorage.setItem(STORAGE_KEY, serialize(data))
}

function serialize(value) {
  return JSON.stringify(value)
}

function deserialize(value) {
    return JSON.parse(value)
}