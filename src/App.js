import logo from './logo.svg';
import { Route, BrowserRouter, Routes } from 'react-router-dom';

import Home from './Pages/Home';
import Create from './Pages/Create';
import Showcase from './Pages/Showcase';
import Test from './Pages/Test';
import { New } from './Pages/New';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="new" element={<New />} />
          <Route path=":project/create" element={<Create />} />
          <Route path=":project/showcase" element={<Showcase />} />
          <Route path="test" element={<Test />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
