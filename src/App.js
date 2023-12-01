import logo from "./logo.svg";
import "./App.css";
import { combineReducers, createStore } from "redux";
import LogInReducer from "./Components/Reducers/LoginReducer";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogedIn from "./Components/LogedIn";
import LoginComponent from "./Components/Login";
import SignupComponent from "./Components/Signup";
import BookFlight from "./Components/BookFlight";

const store = createStore(
  combineReducers({
    LogIn: LogInReducer,
  })
);
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/login"
              exact={true}
              element={
                <LogedIn>
                  <LoginComponent />
                </LogedIn>
              }
            ></Route>
            <Route
              path="/register"
              exact={true}
              element={
                <LogedIn>
                  <SignupComponent />
                </LogedIn>
              }
            ></Route>
            <Route
              path="/bookflight"
              exact={true}
              element={<BookFlight />}
            ></Route>

            <Route
              index
              element={
                <LogedIn>
                  <LoginComponent />
                </LogedIn>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
