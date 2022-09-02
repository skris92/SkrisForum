import { useEffect, useState } from "react";
import axios from "axios";

export default useFetch;

function useFetch(url) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setData(null);
        setError(null);

        const fetchData = async (url) => {
            setLoading(true);
            await axios.get(url)
            .then(response => {
                setData(response.data);
            })
            .catch(err => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
        }
        fetchData(url);
    }, [url]);

    return {data, loading, error};
}