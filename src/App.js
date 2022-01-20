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

function PokemonSearch() {
    const queryInfo = useQuery("pokemon", async () => {
        // return axios
        //     .get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        //     .then((res) => res.data)
    })

    return queryInfo.isLoading ? (
        "Loading..."
    ) : queryInfo.isError ? (
        queryInfo.error.message
    ) : (
        <div>
            <input type="text" placeholder="search pokemon..." />
            <br />
            {/*{queryInfo.data?.sprites?.front_default ? (*/}
            {/*    <img src={queryInfo.data.sprites.front_default} alt="pokemon" />*/}
            {/*) : (*/}
            {/*    "Pokemon not found"*/}
            {/*)}*/}
            {/*<br />*/}
            {/*{queryInfo.isFetching ? "Updating..." : null}*/}
        </div>
    )
}

export default App
