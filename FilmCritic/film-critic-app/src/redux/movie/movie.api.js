// public route
export const getMoviesPublicAPI = async (searchWords) => {
    try {   
        const resp = await fetch(`http://localhost:3000/movieSearchPublic/${searchWords}`)
        if(resp.status === 200) {
            const data = await resp.json();
            return data;
        }
        return null;
    } catch (error) {
        console.debug('Caught an error inside getMoviesPublicAPI');
        console.debug(error);
        return null;
    }
}

export const getReviewsByMovieIDPublic = async() => {
    try {
        const resp = await fetch(`http://localhost:3000/movies/top3`, {
            method: "GET",
            headers: {'Content-Type' : 'application/json'}
        })
        if(resp.status === 200) {
            const data = await resp.json();
            return data;
        } else if (resp.status === 401) {
            return resp.statusText;
        }
        return null;
    } catch (error) {
        console.debug('Caught an error inside getReviewByMovieID');
        console.debug(error);
        return null;
    }
}

// authorized routes
export const getMoviesPrivateAPI = async (searchObj) => {
    try {   
        const {token, movieSearch} = searchObj;
        console.log(movieSearch)
        const resp = await fetch(`http://localhost:3000/movieSearchPrivate/${movieSearch}`, {
            method: "GET",
            headers: {'Content-Type' : 'application/json', 'authorization' : `bearer ${token}`}
        })
        if(resp.status === 200) {
            const data = await resp.json();
            return data;
        } else if (resp.status === 401) {
            const data = await resp.json();
            return resp.statusText;
        }
        return null;
    } catch (error) {
        console.debug('Caught an error inside getMoviesPrivateAPI');
        console.debug(error);
        return null;
    }
}

export const submitMovieReview = async(reviewObj) => {
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
            const { id } = data;
            const newData = {imdbID: id, userID: reviewObj.userID, token: reviewObj.token}
            return newData;
        } else if (resp.status === 401) {
            return resp.statusText;
        }
        return null;
    } catch (error) {
        console.debug('Caught an error inside submitMovieReview');
        console.debug(error);
        return null;
    }
}


export const getReviewsByMovieID = async(reviewObj) => {
    console.log(reviewObj)
    try {
        const resp = await fetch(`http://localhost:3000/users/${reviewObj.userID}/movies/${reviewObj.imdbID}/reviews`, {
            method: "GET",
            headers: {'Content-Type' : 'application/json', 'authorization' : `bearer ${reviewObj.token}`}
        })
        if(resp.status === 200) {
            const data = await resp.json();
            return data;
        } else if (resp.status === 401) {
            return resp.statusText;
        }
        return null;
    } catch (error) {
        console.debug('Caught an error inside getReviewByMovieID');
        console.debug(error);
        return null;
    }
}


export const updateReviewsByReviewID = async(reviewObj) => {
    try {
        const reviewBody = {
            review: reviewObj.review,
            fanscore: reviewObj.fanscore
        }
        const resp = await fetch(`http://localhost:3000/users/${reviewObj.userID}/movies/${reviewObj.imdbID}/reviews/${reviewObj.reviewID}`, {
            method: "PUT",
            headers: {'Content-Type' : 'application/json', 'authorization' : `bearer ${reviewObj.token}`},
            body: JSON.stringify(reviewBody)
        })
        if(resp.status === 200) {
            const data = await resp.json();
            return data;
        } else if (resp.status === 401) {
            return resp.statusText;
        }
        return null;
    } catch (error) {
        console.debug('Caught an error inside updateReviewsByReviewID');
        console.debug(error);
        return null;
    }
}

export const deleteReviewByReviewID = async(reviewObj) => {
    try {
        const resp = await fetch(`http://localhost:3000/users/${reviewObj.userID}/movies/${reviewObj.imdbID}/reviews/${reviewObj.reviewID}`, {
            method: "DELETE",
            headers: {'Content-Type' : 'application/json', 'authorization' : `bearer ${reviewObj.token}`},
        })
        if(resp.status === 200) {
            const data = await resp.json();
            const { id } = data;
            const newData = {imdbID: id, userID: reviewObj.userID, token: reviewObj.token}
            return newData;
        } else if (resp.status === 401) {
            return resp.statusText;
        }
        return null;
    } catch (error) {
        console.debug('Caught an error inside deleteReviewByReviewID');
        console.debug(error);
        return null;
    }
}