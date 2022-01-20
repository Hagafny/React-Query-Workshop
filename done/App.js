import React from "react"
import { useQuery } from "react-query"
import axios from "axios"
import { sleep } from "./utils"
const FETCH_POKEMON_URL = "https://pokeapi.co/api/v2/pokemon"

function App() {
    return (
        <div>
            <PokemonCounter />
            <PokemonList queryKey="pokemon" />
        </div>
    )
}

function PokemonList({ queryKey }) {
    const queryInfo = useQuery(queryKey, async () => {
        await sleep(1000)
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

function PokemonCounter() {
    const queryInfo = useQuery("pokemon", async () => {
        await sleep(1000)
        return axios.get(FETCH_POKEMON_URL).then((res) => res.data.results)
    })

    return <h3>You are looking at {queryInfo.data?.length}</h3>
}

function usePokemon() {
    return useQuery("pokemon", async () => {
        await sleep(1000)
        return axios.get(FETCH_POKEMON_URL).then((res) => res.data.results)
    })
}

export default App
