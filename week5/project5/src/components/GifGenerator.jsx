function GifGenerator( {currentGiph, toggleBanCategory, handleGenerate} ) {
  const {url, title, tag} = currentGiph
  const handleClick = () =>{
    toggleBanCategory(tag)
  }

  return (
    <div className='generator-container'>
        <h3> Click below to generate a random gif!</h3>
        <button className='generatep-gif' onClick={handleGenerate}>Generate</button>

        <br />

        <div className='giphy-container'>
          <img src={url} alt={title} />
          <h4> {title || "Untitled Giphy"}</h4>
          <button onClick={handleClick}>{tag}</button>
          <p className='tag-help-text'>Click the tag to ban/unban it from future generations</p>
        </div>
      
    </div>
  )
}

export default GifGenerator
