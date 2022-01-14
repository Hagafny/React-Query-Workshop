import "./App.css"
import { useQuery } from "react-query"
import axios from "axios"
import { FETCH_POKEMON_URL } from "./consts"

function App() {
    const queryInfo = useQuery("pokemon", async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        axios.get(FETCH_POKEMON_URL).then((res) => res.data.results)
    })

    console.log(queryInfo.isSuccess)

    return queryInfo.isLoading ? (
        "Loading..."
    ) : (
        <div>
            {queryInfo.data.map((pokemon) => (
                <div key={pokemon.name}>{pokemon.name}</div>
            ))}
        </div>
    )
}

export default App
