import React from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { FETCH_POKEMON_URL } from "./consts"

function App() {
    return (
        <div>
            <Count />
            <PokemonList queryKey="pokemon" />
        </div>
    )
}

function Count() {
    const queryInfo = usePokemon()
    return <h3>You are looking at {queryInfo.data?.length} pokemon</h3>
}

function usePokemon() {
    return useQuery("pokemon", async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return axios.get(FETCH_POKEMON_URL).then((res) => res.data.results)
    })
}

function PokemonList() {
    const queryInfo = usePokemon()

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
