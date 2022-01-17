import React from "react"
import { useQuery } from "react-query"
import axios from "axios"
import PostForm from "./components/PostForm"

function App() {
    return <Posts />
}

export function Posts() {
    const postsQuery = useQuery("posts", () => {
        return axios.get("/api/posts").then((res) => res.data)
    })

    const createPost = (values) => {
        console.log("create post", values)
        // axios.post("/api/posts", values).then((res) => res.data)
    }

    return (
        <section>
            <div className="posts-container">
                <div>
                    {postsQuery.isLoading ? (
                        <span>Loading...</span>
                    ) : (
                        <>
                            <h3>
                                Posts{" "}
                                {postsQuery.isFetching ? (
                                    <small>...</small>
                                ) : null}
                            </h3>
                            <ul>
                                {postsQuery.data.map((post) => (
                                    <li key={post.id}>{post.title}</li>
                                ))}
                            </ul>
                            <br />
                        </>
                    )}
                </div>
            </div>

            <hr />

            <div className="add-post-container">
                <h3>Create new Post</h3>
                <div>
                    <PostForm
                        onSubmit={createPost}
                        clearOnSubmit
                        submitText="Create Post"
                    />
                </div>
            </div>
        </section>
    )
}

export default App
