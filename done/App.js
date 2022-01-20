import React, { useState } from "react"
import { useQuery } from "react-query"
import axios from "axios"

function App() {
    const [pokemon, setPokemon] = useState("")
    const changePokemonInput = (e) => setPokemon(e.target.value)

    return (
        <>
            <input
                type="text"
                placeholder="search pokemon..."
                value={pokemon}
                onChange={changePokemonInput}
            />
            <br />
            <PokemonSearch pokemon={pokemon} />
        </>
    )
}

function PokemonSearch({ pokemon }) {
    const queryInfo = useQuery(
        ["pokemon", pokemon],
        async () => {
            return axios
                .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
                .then((res) => res.data)
        },
        {
            enabled: !!pokemon,
            retry: 1, //0
            retryDelay: (attemptedIndex) =>
                Math.min(1000 * 2 ** attemptedIndex, 30000), // 1000
        }
    )

    return queryInfo.isLoading ? (
        "Loading..."
    ) : queryInfo.isError ? (
        queryInfo.error.message
    ) : (
        <div>
            {queryInfo.data?.sprites?.front_default ? (
                <img src={queryInfo.data.sprites.front_default} alt="pokemon" />
            ) : (
                "Pokemon not found"
            )}
            {/*<br />*/}
            {queryInfo.isFetching ? "Updating..." : null}
        </div>
    )
}
export default App
