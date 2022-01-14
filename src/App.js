import React from "react"
import { useQuery } from "react-query"
import axios from "axios"
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useParams,
} from "react-router-dom"

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/:postId" element={<Post />} />
                <Route path="/" element={<Posts />} />
            </Routes>
        </Router>
    )
}

function Posts() {
    const postsQuery = useQuery("posts", async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return axios
            .get("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.data)
    })

    return (
        <div>
            <h1>Posts {postsQuery.isFetching ? "..." : null}</h1>
            <div>
                {postsQuery.isLoading ? (
                    "Loading posts..."
                ) : (
                    <ul>
                        {postsQuery.data.map((post) => {
                            return (
                                <li key={post.id}>
                                    <Link to={`/${post.id}`}>{post.title}</Link>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
        </div>
    )
}

function Post() {
    const { postId } = useParams()
    const postQuery = useQuery(["post", postId], async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return axios
            .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then((res) => res.data)
    })

    return (
        <div>
            <Link to={"/"}>Back</Link>
            <br />
            <br />
            {postQuery.isLoading ? (
                "Loading..."
            ) : (
                <>
                    {postQuery.data.title}
                    <br />
                    <br />
                    {postQuery.isFetching ? "Updating..." : null}
                </>
            )}
        </div>
    )
}

export default App
