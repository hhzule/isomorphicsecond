import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App"
import "bootstrap/dist/css/bootstrap.min.css"
import { AuthProvider } from "./contexts/AuthContext"
import DataProvider from './components/firebaseDisplayComponent/DataProvider'
ReactDOM.render(
  <AuthProvider>
    <DataProvider>
      <App />
    </DataProvider>
  </AuthProvider>
  ,
  document.getElementById("root")
)
