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
        (post) => axios.post("/api/posts", post),
        {
            onSuccess: () => {
                queryClient.invalidateQueries("posts")
            },
        }
    )

    console.log(createPostMutation)

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
                        onSubmit={createPostMutation.mutate}
                        clearOnSubmit
                        submitText={
                            createPostMutation.isLoading
                                ? "Loading..."
                                : createPostMutation.isError
                                ? "Error..."
                                : createPostMutation.isSuccess
                                ? "Saved!"
                                : "Create Post"
                        }
                    />
                    {createPostMutation.isError ? (
                        <pre>
                            {createPostMutation.error.response.data.message}
                        </pre>
                    ) : null}
                </div>
            </div>
        </section>
    )
}

export default App
