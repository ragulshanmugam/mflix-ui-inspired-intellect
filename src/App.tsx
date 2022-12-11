import React, {MouseEventHandler} from 'react';
import Sidebar from "./components/navigation/NavigationWithSidebar";
import MovieCarousel from "./components/carousel/MoviesCarousel";

function App() {

  return (
    <div className="App">
            <Sidebar />
            <MovieCarousel />
    </div>
  );
}

export default App;
