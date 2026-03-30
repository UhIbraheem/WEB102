function AvailableCategories({categories}) {

  if (categories.length === 0) return <p>loading...</p>

  const renderedNames = categories.map(cat => (
    <li key={cat.name}> {cat.name} </li>)
  );
    

  return (
    <div>
      <h1>Available categories</h1>
      <ul>{renderedNames}</ul>
    </div>
  )
}

export default AvailableCategories
