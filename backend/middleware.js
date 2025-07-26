import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  try {
    const token = req.header('x-token')
    if (!token) return res.status(401).send("Access Denied: No token provided")

    const decoded = jwt.verify(token, 'jwtSecret')
    req.user = decoded.user
    next()
  } catch (error) {
    console.error(error)
    return res.status(401).send("Invalid or expired token")
  }
}

export default auth
