export const getMoviesAPI = async (searchWords) => {
    try {   
        const resp = await fetch(`http://localhost:3000/movieSearch/${searchWords}`)
        if(resp.status === 200) {
            const data = await resp.json();
            return data;
        }
        return null;
    } catch (error) {
        console.debug('Caught an error inside getMoviesAPI');
        console.debug(error);
        return null;
    }
}

export const submitFirstMovieReview = async(reviewObj) => {
    try {
        const reviewBody = {
            review: reviewObj.review,
            score: reviewObj.score
        }
        const resp = await fetch(`http://localhost:3000/users/${reviewObj.userID}/movies/${reviewObj.imdbID}/review`, {
            method: "POST",
            headers: {'Content-Type' : 'application/json', 'authorization' : `bearer ${reviewObj.token}`},
            body: JSON.stringify(reviewBody)
        })
        if(resp.status === 200) {
            const data = await resp.json();
            return data;
        }
        return null;
    } catch (error) {
        console.debug('Caught an error inside submitMovieReview');
        console.debug(error);
        return null;
    }
}