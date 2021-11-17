const getToken = (req) => {
    
    const authHeader = req.headers.authorization

    if(authHeader){
        const token = authHeader.split(" ")[1]
        return token
    }

    return
    
}

module.exports = getToken