import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

class Discuss extends React.Component {
    state = {
        loading: true,
    }

    componentDidMount() {
        // this simulates an async action, after which the component will render the content
        demoAsyncCall().then(() => this.setState({ loading: false }))
    }

    render() {
        const { loading } = this.state

        if (loading) {
            // if your component doesn't have to wait for an async action, remove this block
            return null // render null when app is not ready
        }

        return (
            <div>
                <App />
            </div>
        )
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <Discuss />
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

function demoAsyncCall() {
    return new Promise((resolve) => setTimeout(() => resolve(), 2500))
}
