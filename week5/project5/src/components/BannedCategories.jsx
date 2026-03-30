function BannedCategories( { bannedCategories } ) {
  const arrFromSet = [...bannedCategories]
  const renderBanned = arrFromSet.map(tag => (
    <li key={tag}> {tag} </li>)
  );

  return (
    <div className='banned-categories-container'>
        <h2>Banned Items: </h2>
        <ul>
          {renderBanned}
        </ul>
      
    </div>
  )
}

export default BannedCategories
