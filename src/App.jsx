import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts and pages
import RootLayout from "./layouts/RootLayout.jsx";
import Home from "./pages/Home/Home.jsx";
import Auth from "./pages/AuthConfig/AuthConfig.jsx";


// router and routes
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
        <Route path="Home" element={<Home />} />
      <Route path="/" element={<Auth />} />
     
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;