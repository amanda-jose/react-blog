import { useState, useEffect } from 'react';

const useFetch = (url) => { //custom hooks need to start with the word use!

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => { //runs for every render! useful for fetching data from json 
        console.log('use effect ran')

        const abortCont = new AbortController();

        fetch(url, {signal: abortCont.signal})
        .then(res => {
            if(!res.ok){
                throw Error('could not fetch the data for that resource');
            }
            return res.json()
        })
        .then((data) => {
            console.log(data);
            setData(data); // updates state to the json data
            setIsPending(false);
            setError(null);
        })
        .catch((err) => {
            if (err.name === 'AbortError'){
                console.log('fetch aborted')
            }else{
                setError(err.message);
                setIsPending(false);
            }
        })

        return () => abortCont.abort();

    }, [url]); // [] empty runs the function once or if value inside square brackets, then it will watch when that state changes

    return {
        data, isPending, error
    }
}

export default useFetch;