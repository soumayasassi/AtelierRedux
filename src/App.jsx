import { Route, Routes } from "react-router-dom";
import "./App.css";
import React, { Suspense } from "react";
import Wishlist from "./components/Wishlist";
import Counter from "./components/Counter";
import { useDispatch } from "react-redux";
import { fetchEvents } from "./redux/slices/eventsSlice";
const Events = React.lazy(() => import("./components/Events"));
const EventDetails = React.lazy(() => import("./components/EventDetails"));
const AddEvent = React.lazy(() => import("./components/AddEvent"));
const UpdateEvent = React.lazy(() => import("./components/UpdateEvent"));
const NavigationBar = React.lazy(() => import("./components/NavigationBar"));
function App() {
  const dispatch = useDispatch() ; 
  return (
   
     <Suspense fallback={<p> chargement</p>}>
      <NavigationBar />
      <Routes>
        <Route path="/events">
          <Route index element={<Events />}loader={dispatch(fetchEvents())} />
          <Route path="add" element={<AddEvent />} />
          <Route path=":id" element={<EventDetails />} />
          <Route path="update/:id" element={<UpdateEvent />} />
        </Route>
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="*"
          element={<img src="/images/notfound.jfif" width="100%" />}
        />
      </Routes>
    </Suspense> 
  );
}

export default App;
