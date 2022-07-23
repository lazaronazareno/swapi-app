import { useEffect, useState } from 'react'

import axios from 'axios'

const baseURL = 'https://swapi.dev/api/people'

axios.defaults.baseURL = baseURL

const useAxios = (axiosParams) => {
	console.log(axiosParams)
	const [response, setResponse] = useState()

	const [error, setError] = useState()

	const [loading, setLoading] = useState(false)

	
	const fetchData = async (params) => {
		console.log(JSON.stringify(params))
		setLoading(true)
			try {
				const result = await axios.request(params)
				setResponse(result)
			}

			catch(err) {
				if (axios.isAxiosError(err)) {
					setError(err)
				}
			}

			finally{
				setLoading(false)
			}
	}

	useEffect(() => {
    if(axiosParams.method === "GET" || axiosParams.method === "get"){
      fetchData(axiosParams);
    }
	},[]);

	return { response, error, loading, fetchData }
}


export default useAxios