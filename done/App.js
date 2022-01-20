import React from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from "axios"
import PostForm from "./components/PostForm"

function App() {
    const queryClient = useQueryClient()
    const postsQuery = useQuery("posts", () => {
        return axios.get("/api/posts").then((res) => res.data)
    })

    const createPost = useMutation(
        (values) => {
            return axios.post("/api/posts", values).then((res) => res.data)
        },
        {
            onError: (error) => alert(error.response.data.message),
            onSuccess: () => {
                queryClient.invalidateQueries("posts")
            },
        }
    )

    console.log(createPost)

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
                        </>
                    )}
                </div>
            </div>

            <hr />

            <div className="add-post-container">
                <h3>Create new Post</h3>
                <div>
                    <PostForm
                        onSubmit={createPost.mutate}
                        clearOnSubmit
                        submitText={
                            createPost.isLoading
                                ? "Loading..."
                                : createPost.isError
                                ? "Error..."
                                : createPost.isSuccess
                                ? "Saved!"
                                : "Create Post"
                        }
                    />
                    {createPost.isError ? (
                        <pre>{createPost.error.response.data.message}</pre>
                    ) : null}
                </div>
            </div>
        </section>
    )
}

export default App
