import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import {InventoryItemList} from './components/InventoryItemList'
import {EditInventoryItem} from './components/EditInventoryItem'
import {CreateInventoryItem} from './components/CreateInventoryItem'
import {ViewInventoryItem} from './components/ViewInventoryItem'

function App() {
  return (
    <div>
      <nav className="navbar bg-light navbar-expand-lg navbar-light">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
            <Link to="/" className="nav-link">Inventory Items List</Link>
          </li>
          <li className="navbar-item">
            <Link to="/create" className="nav-link">Create Inventory Item</Link>
          </li>
        </ul>
      </nav>
    <Routes>
      <Route exact path="/" element={<InventoryItemList/>} />
      <Route path="/edit/:id" element={<EditInventoryItem/>} />
      <Route path="/view/:id" element={<ViewInventoryItem/>} />
      <Route path="/create" element={<CreateInventoryItem/>} />
    </Routes>
    </div>
  );
}

export default App;
