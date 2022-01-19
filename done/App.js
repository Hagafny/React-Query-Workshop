import React from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import axios from "axios"
import PostForm from "./components/PostForm"

function App() {
    const queryClient = useQueryClient()
    const postsQuery = useQuery("posts", () => {
        return axios.get("/api/posts").then((res) => res.data)
    })

    const createPostMutation = useMutation(
        (newValues) => {
            return axios.post("/api/posts", newValues)
        },
        {
            onError: (error) => alert(error.response.data.message),
            onSettled: () => queryClient.invalidateQueries("posts"),
        }
    )

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
                        onSubmit={createPostMutation.mutate}
                        clearOnSubmit
                        submitText={
                            createPostMutation.isLoading
                                ? "Loading..."
                                : createPostMutation.isError
                                ? "Error!"
                                : createPostMutation.isSuccess
                                ? "Saved!"
                                : "Create Post"
                        }
                    />
                </div>
                {createPostMutation.isError ? (
                    <pre>{createPostMutation.error.response.data.message}</pre>
                ) : null}
            </div>
        </section>
    )
}

export default App
