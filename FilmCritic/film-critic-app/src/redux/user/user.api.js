export const registerUserAPI = async (payload) => {
    try {
        const resp = await fetch('http://localhost:3000/register', {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        })
        if(resp.status === 200) {
            const data = await resp.json();
            return data;
        }  
        return null;
    } catch (error) {
        console.debug('Caught an error inside registerUserAPI')
        console.debug(error)
        return null;
    } 
}

export const loginUserAPI = async (payload) => {
    try {
        const resp = await fetch('http://localhost:3000/login', {
            method: "POST",
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(payload)
        })
        if(resp.status === 200) {
            const data = await resp.json();
            return data;
        }
        return null;
    } catch (error) {
        console.debug('Caught an error inside loginUserAPI');
        console.debug(error);
        return null;
    }
}

// Delete user token in Redis
export const logoutUserAPI = async(token) => {
    try { 
        const resp = await fetch('http://localhost:3000/signout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'authorization' : `bearer ${token}`
            }
        })
        if(resp.status === 200) {
            const data = await resp.json()
            return data;
        } 
        return null;
    } catch (error) {
        console.debug('Caugh an error in logoutUserAPI');
        console.log(error);
        return null;
    }
}

export const getUserBlogsAPI = async(payload) => {
    try {
        const {currentUser, token} = payload;
        const resp = await fetch(`http://localhost:3000/${currentUser.id}/posts`, {
            method: "GET",
            headers: {'Content-Type': 'application/json',
                     "authorization" : `bearer ${token}`
            }
        })
        if(resp.status === 200) {
            const data = await resp.json()
            return data;
        }
       return null;
    } catch (error) {
        console.debug('Caught an error in getUserBlogsAPI');
        console.debug(error)
        return null;
    }
}