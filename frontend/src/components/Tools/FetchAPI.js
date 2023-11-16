async function fetchAPI(endpoint, method, data) {
    const requestOptions = {
        method: method,
        headers: { 'Content-Type': 'application/json' }
    };

    if (data && method!='GET') {
        requestOptions.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(endpoint, requestOptions);

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
    }
}

export {fetchAPI}