import './App.css'
import Countries from './Countries'
import Country from './Country';
import Navbar from './Navbar'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState('light');


  useEffect(()=>{
    console.log(theme);
    if(theme === 'dark'){
      document.documentElement.classList.add('dark');
    }else{
      document.documentElement.classList.remove('dark');
    }
  }, [theme])


  const handleThemeSwitch = ()=>{
      setTheme((theme === 'light')? 'dark': 'light');
  }


  return (
      
    <BrowserRouter>
      <Navbar handleThemeSwitch={handleThemeSwitch} />
      <Routes>
        <Route path="/" element={<Countries/>} />
        <Route path="/country/:id" element={<Country/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
