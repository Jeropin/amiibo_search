const superagent = require('superagent');
const config = require('./config.json');

// Export a method for API search
const search = async (search) =>{
    const searchUrl = `${config.url}gameseries/`;
    try{
        const searchResponse = await superagent.get(searchUrl);
        const getAmiibos = searchResponse.body['amiibo']
        const filterSearch = getAmiibos.filter(element => element['name'].toLowerCase().includes(search.toLowerCase()));
        return filterSearch;
    } catch (error){
        return error;
    }
}

// Export a method for API fetch
const fetch = async (fetch) =>{
    const fetchUrl = `${config.url}amiibo/?gameseries=${fetch}`
    try {
        const fetchResponse = await superagent.get(fetchUrl);
        const getAmiibo = fetchResponse.body['amiibo']
        return getAmiibo;
    } catch (error){
        return error;
    }
}

// This are most likely 2 different URLs (one for searching and the other to fetch by a unique identifier)
module.exports = {
    search,
    fetch
}