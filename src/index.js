<<<<<<< HEAD
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
=======
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { QueryClientProvider, QueryClient } from 'react-query'
>>>>>>> 1-intro

const queryClient = new QueryClient()

ReactDOM.render(
    <QueryClientProvider client={queryClient}>
        <App />
        <ReactQueryDevtools />
    </QueryClientProvider>,
    document.getElementById("root")
)
