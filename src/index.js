<<<<<<< HEAD
import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./App"
import { QueryClientProvider, QueryClient } from "react-query"
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
    </QueryClientProvider>,
    document.getElementById("root")
)
