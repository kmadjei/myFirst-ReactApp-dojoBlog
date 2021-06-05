// CUSTOM HOOK
// imported state hooks to be used 
import { useState, useEffect } from 'react';

const useFetch = (url) => {

    // destructuring variables
    // using useState is best practice for inserting dynamic content
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    //useEffect Hook dependencies renders when [name] dependency changes
    // fetch data with useEffect as soon as application first renders
    useEffect(() => {
        // associate it with a specific fetch request
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, {signal: abortCont.signal})
            .then(response => {
                if (!response.ok) { // error coming back from server/ endpoint
                throw Error('could not fetch the data for that resource');
                } 
                return response.json();
            })
            .then(data => {
                //stops conditional loading msg from loading when blog data is received
                setIsPending(false);
                //updates the state for "blogs"
                setData(data);
                // updates previous error to null
                setError(null);
                
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    //If error is caused by custom AbortController 
                    // error useState will not be changed
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsPending(false);
                    setError(err.message);
                }
            })
        }, 1000);

        // abort the fetch when home component is unmounted from React DOM
        return () => abortCont.abort();

    }, [url])

    return { data, isPending, error };;
}
 
export default useFetch;