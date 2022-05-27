import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import DataCollect from './pages/Components/DataCollectComponent';
import DisplayProduct from './pages/Components/DisplayProducts/DisplayProductComponent';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<DataCollect />}/>
      <Route path='/product-details' element={<DisplayProduct />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
