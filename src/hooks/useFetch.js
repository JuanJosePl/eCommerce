import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../constants/env"

const useFetch = ( endpoint, headers = {} ) => {

    const [data, setData] = useState()

    const [error, setError] = useState()

    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        axios
        .get(`${ API_URL }/${ endpoint }`)
        .then((resp) => {
            setData(resp.data.data)
        })
        .catch((err) => {
            setError(err)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    return { data, error, loading }
    
}

export default useFetch