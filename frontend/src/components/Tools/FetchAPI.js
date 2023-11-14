async function fetchAPI(endpoint, method, data) {

    
    let options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(data)
    };

    

    try {
        const response = await fetch(endpoint, options);
       
        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

export {fetchAPI}