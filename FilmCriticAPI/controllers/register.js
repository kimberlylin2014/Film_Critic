// Function that registers User to DB. 
// Returns resolved Promise of User if success, rejected Promise if fails.
const registerUserToDB = (email, hashedPassword, username, db) => {
    return db.transaction(tx => {
        tx('login')
            .returning('email')
            .insert({email: email, password: hashedPassword})
            .then(emailArray => {
                return tx('users')
                    .returning('*')
                    .insert({email: emailArray[0], username: username})
                    .then(userData => {
                        return Promise.resolve(userData[0])
                    })
            })
            .then(tx.commit)
            .catch(tx.rollback)
    })
    .catch(e => {
        return Promise.reject("User is already registered")
    })
}

// Output: Validated User {id: 3, email: 'xcv@zxc.com', blogs: []}
const handleRegister = async(req, res, bcrypt, db) => {
    try {
        const {email, password, username} = req.body;
        console.log(email)
        console.log(password)
        console.log(username)
        const hashedPassword =  await bcrypt.hash(password, 10)
        const registeredUser = await registerUserToDB(email, hashedPassword, username, db)
        res.json(registeredUser)
    } catch (e) {
        console.log(e)
        let message = 'Something Went Wrong during Registration';
        if(e === 'User is already registered') {
            message = e
        } 
        res.status(400).json(message)
    }
}

module.exports = {
    handleRegister: handleRegister
}