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

export const fetchRandomGif = async(tag) => {
    const api_key = import.meta.env.VITE_GIPHY_API_KEY;
    const encodedTag = encodeURIComponent(tag)

    const response = await fetch(`https://api.giphy.com/v1/gifs/random?api_key=${api_key}&tag=${encodedTag}&rating=g`)
    const data = await response.json();

    if (response.ok){
        return {
            url: data.data.images.fixed_height.url,
            title: data.data.title,
            tag: tag
        }
    } else {
        throw new Error("Bruh, fix the fetchRandomGif function")
    }
}
