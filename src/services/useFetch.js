/*Create a single hook that makes it easy to make http calls

Goals for hook
- fetch data
- store related state (response, loading state, and error)

https://app.pluralsight.com/course-player?clipId=e024d15c-dcf7-4608-81ad-0d4180236f74

*/

import {useState, useRef, useEffect} from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
    const isMounted = useRef(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        isMounted.current = true;
        async function init() {
          try {
            const response = await fetch(baseUrl + url)
            if (response.ok) {
                const json = await response.json();
                setData(json);
            } else {
                throw response;
            }
          } catch (e) {
            if (isMounted.current) setError(e);
          } finally {
           if (isMounted.current) setLoading(false);
          }
        }
        init();
        return () => {
          isMounted.current = false;
        }
      }, [url])

      return {data, error, loading};
}