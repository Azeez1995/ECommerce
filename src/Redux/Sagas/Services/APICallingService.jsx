export async function createRecord(collection, payload) {
    let response = await fetch(`/${collection}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
}

export async function createMultipartRecord(collection, payload) {
    let response = await fetch(`/${collection}`, {
        method: "POST",
        headers: {

        },
        body: payload
    })
    return await response.json()
}

export async function getRecord(collection, payload) {
    let response = await fetch(`/${collection}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await response.json()
}
export async function updateRecord(collection, payload) {
    let response = await fetch(`/${collection}/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    return await response.json()
}
export async function updateMultiPartRecord(collection, payload) {
    let response = await fetch(`/${collection}/${payload.id}`, {
        method: "PUT",
        headers: {

        },
        body: payload
    })
    return await response.json()
}
export async function deleteRecord(collection, payload) {
    let response = await fetch(`/${collection}/${payload.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    })
    return await response.json()
}