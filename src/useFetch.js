//--------------- CUSTOM HOOK
// file name needs to start with "use"

// imported react hooks to be used 
import { useState, useEffect } from 'react';

// "url" >> endpoint url passed on to custom Hook function from Home.js
// custom Hook --> useFetch
const useFetch = (url) => {

    // destructuring variables --> state properties
    // useState React hook >> best practice for creating reactive values for dynamically updating rendered content
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);


    // use EFfect function executes on every render when no 2nd argument is included
    // "[url] " use effect dependency array / 2nd argument executes use effect function when ever its states changes
    // fetches the data with useEffect as soon as application first renders
    useEffect(() => {
        // associate it with a specific fetch request
        // used to stop a specific fetch request
        const abortCont = new AbortController();

        // setTimeout is used to delay fetch response for observing the effects of "isPending" when url is taking a long time to load
        setTimeout(() => {
            fetch(url, {signal: abortCont.signal /*associating abortCont to this fetch */})
            .then(response => {
                if (!response.ok) { 
                    // if error coming back from (response) is not okay
                    throw Error('could not fetch the data for that resource');
                } 
                return response.json(); // response object
            })
            .then(data => {
                //stops conditional loading msg from rendering when blog data is received
                setIsPending(false);
                // updates the state for "data"
                setData(data);
                // updates previous error to null
                setError(null);
                
            })
            .catch(err => {
                if (err.name === 'AbortError') {
                    // If error is caused by custom AbortController 
                    // error useState variables will not updated
                    console.log('fetch aborted')
                } else {
                    // automatically catches network / connection error
                    //stops conditional loading msg from rendering when error message is found
                    setIsPending(false);
                    // updates the state of "error" variable 
                    setError(err.message);
                }
            })
        }, 1000);

        // abort the fetch when home component is unmounted from React DOM
        // stops the useEffect from still running after a React link has been clicked
        return () => abortCont.abort();

    }, [url])

    // results being returned by the Custom Hook
    return { data, isPending, error };
}
 
export default useFetch;