const getUserPosts = (req, res, db) => {
    console.log(req.params.id)
    db('users')
        .where({id: req.params.id})
        .select('*')
        .then(userData => res.json(userData[0]))
}

module.exports = {
    getUserPosts: getUserPosts
}