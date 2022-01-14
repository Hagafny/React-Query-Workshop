import React from "react"
import { useQuery } from "react-query"
import axios from "axios"

function App() {
    const [pokemon, setPokemon] = React.useState("")

    return (
        <div>
            <input
                value={pokemon}
                type="text"
                onChange={(e) => setPokemon(e.target.value)}
            />
            <PokemonSearch pokemon={pokemon} />
        </div>
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
            <br />
            {queryInfo.isFetching ? "Updating..." : null}
        </div>
    )
}

export default App

// <img src={queryInfo.data.sprites.front_default} alt="pokemon" />
