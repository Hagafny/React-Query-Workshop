import React from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { FETCH_POKEMON_URL } from "./consts"

function App() {
    const [showList, setShowList] = React.useState(true)

    const togglePokemonList = () => setShowList(!showList)

    return (
        <div>
            <button onClick={togglePokemonList}>
                {showList ? "Hide" : "Show"}
            </button>
            <br />
            {showList ? <PokemonList /> : null}
        </div>
    )
}

function PokemonList() {
    const queryInfo = useQuery("pokemon", async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return axios.get(FETCH_POKEMON_URL).then((res) => res.data.results)
    })

    return queryInfo.isLoading ? (
        "Loading..."
    ) : queryInfo.isError ? (
        queryInfo.error.message
    ) : (
        <div>
            {queryInfo.data.map((pokemon) => (
                <div key={pokemon.name}>{pokemon.name}</div>
            ))}

            <br />
            {queryInfo.isFetching ? "Updating..." : null}
        </div>
    )
}

export default App
