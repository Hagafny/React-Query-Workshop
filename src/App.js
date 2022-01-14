import React from "react"
import { useQuery } from "react-query"
import axios from "axios"

function App() {
    return (
        <div>
            <PokemonSearch />
        </div>
    )
}

function PokemonSearch({ pokemon }) {
    const queryInfo = useQuery("pokemon", async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // return axios
        //     .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        //     .then((res) => res.data.results)
    })

    return queryInfo.isLoading ? (
        "Loading..."
    ) : queryInfo.isError ? (
        queryInfo.error.message
    ) : (
        <div>Show the pokemon</div>
    )
}

export default App
