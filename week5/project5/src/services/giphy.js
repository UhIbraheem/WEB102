export const fetchCategories = async () => {
    const api_key = import.meta.env.VITE_GIPHY_API_KEY

    const response = await fetch(`https://api.giphy.com/v1/gifs/categories?api_key=${api_key}`);
    const data = await response.json()

    if (response.ok){
        //console.log(data)
        return data.data

    } else {
        throw new Error("something BAD happened")
    }

}

