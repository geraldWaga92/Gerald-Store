
import {useEffect, useState} from 'react';
import { makeRequest } from '../makeRequest';

 const useFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
    const fetchData = async () => { 
        try {
            setLoading(true)
            // instead of axios we use our baseline url to fetch data
            const res = await makeRequest.get(url);
            // we need to write re.data.data for the image to display
            setData(res.data.data);
        } catch (error) {
            setError(true)     
        }
        setLoading(false)
    }
    fetchData();
}, [url]);

return {data, loading, error}
}

export default useFetch;