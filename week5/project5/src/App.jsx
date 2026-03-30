import { useEffect, useState } from 'react'
import GifGenerator from './components/GifGenerator'
import BannedCategories from './components/BannedCategories'
import AvailableCategories from './components/AvailableCategories'
import { fetchCategories, fetchRandomGif } from './services/giphy'

import './App.css'

// Create mock presentable giphy data
// giphy_url, title, tag

function App() {
  const [categories, setCategories] = useState([])
  const [bannedCategories, setBannedCategories] = useState(new Set())
  const [currentGiph, setCurrentGiph] = useState({ url: "", title: "Default", tag: "food" })
  
  // getting all categories for the one time
  useEffect (() => {
    const getData = async () => {
      const data = await fetchCategories();
      setCategories(data);
      //console.log(data)
    }
    getData();
  }, [])

  // fucntion to be passed into gif generator to toggle each tag/ cat
  const toggleBanCategory = (categoryName) => {
    const newSet = new Set([...bannedCategories])
    if (newSet.has(categoryName)) {
      newSet.delete(categoryName)
    } else {
      newSet.add(categoryName)
    }
    setBannedCategories(newSet)
  }


  const handleGenerate = async () => {
    const allowedCategories = categories.filter(
      (cat) => cat?.name && !bannedCategories.has(cat.name)
    )

    if (allowedCategories.length === 0) {
      return
    }

    const randomIndex = Math.floor(Math.random() * allowedCategories.length)
    const randomCategoryName = allowedCategories[randomIndex].name

    try {
      const giphy = await fetchRandomGif(randomCategoryName)
      setCurrentGiph(giphy)
    } catch (error) {
      console.error("Failed to fetch random gif:", error)
    }
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
          handleGenerate={handleGenerate}
        />
        <AvailableCategories categories={categories} />
      </div>
    </>
  )
}

export default App
