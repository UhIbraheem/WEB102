import { useEffect, useState } from 'react'
import GifGenerator from './components/GifGenerator'
import BannedCategories from './components/BannedCategories'
import AvailableCategories from './components/AvailableCategories'
import { fetchCategories } from './services/giphy'

import './App.css'

// Create mock presentable giphy data
// giphy_url, title, tag

function App() {
  const [categories, setCategories] = useState([])
  const [bannedCategories, setBannedCategories] = useState(new Set())
  const [currentGiph, setCurrentGiph] = useState({url: "",title:"Default",tag:"food"})
  useEffect (() => {
    const getData = async () => {
      const data = await fetchCategories();
      setCategories(data);
      console.log(categories)
    }
    getData();
  }, [])

  const toggleBanCategory = (categoryName) => {
    const newSet = new Set([...bannedCategories])
    if (bannedCategories.has(categoryName)){
      newSet.delete(categoryName)
    } else{
      newSet.add(categoryName)
    }
    return setBannedCategories(newSet);
  }

  const handleGenerate = () => {

  }

  return (
    <>
      <div className='app-layout'>
        <div className='heading'>
          <h2>Gif Generator application</h2>
        </div>
        <BannedCategories
          bannedCategories={bannedCategories}

        />
        <GifGenerator
          currentGiph={currentGiph}
          toggleBanCategory={toggleBanCategory}
        />
        <AvailableCategories categories={categories}/>
      </div>
    </>
  )
}

export default App
