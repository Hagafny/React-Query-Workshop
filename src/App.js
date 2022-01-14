import "./App.css"
import { useQuery } from "react-query"
import axios from "axios"
import { FETCH_POKEMON_URL } from "./consts"

function App() {
    const queryInfo = useQuery("pokemon", () =>
        axios.get(FETCH_POKEMON_URL).then((res) => res.data.results)
    )

    console.log(queryInfo)

    return (
        <div className="App">
            <h1>Hello, React Query</h1>
        </div>
    )
}

export default App
