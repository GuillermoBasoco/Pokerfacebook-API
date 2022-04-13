const router = require('express').Router()
const createError = require('http-errors')
const {PrismaClient} = require('@prisma/client')
const authMiddleware = require('../middlewares/auth');
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');
const prisma = new PrismaClient()



router.post('/register', authMiddleware,  async (req, res, next) => {
    try {
        const data = req.body;
        data.password = bcrypt.hashSync(data.password, 8);
        const createdUser = await prisma.user.create({data: data})
        data.accessToken = await jwt.signAccessToken(createdUser)
        res.json(createdUser)

        
    } catch (error) {
        next(error)
    }
})


router.post('/login', authMiddleware, async (req, res, next) => {
    try {
        const data = req.body;
        const { email, password } = data;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            throw createError.NotFound('User not registered')
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) throw createError.Unauthorized('Email address or password not valid')
        delete user.password
        const accessToken = await jwt.signAccessToken(user)
        res.json({accessToken: accessToken})
        
    } catch (error) {
        next(error)
    }
    
});




router.get('/users', authMiddleware, async (req, res, next) => {
    try {
        const users = await prisma.user.findMany({select: {name : true, email: true}})
        res.json(users)
        
    } catch (error) {
        next(error)
    }
})

router.get('/posts', authMiddleware, async (req, res, next) => {
    try {
        const posts = await prisma.post.findMany({include: {User : true}})
        res.json(posts)
        
    } catch (error) {
        next(error)
    }
})

router.get('/posts/:id', authMiddleware, async (req, res, next) => {
    try {
        const {id} = req.params
        const post = await prisma.post.update({where:{ id: Number(id)}, include: {User : true}, data: {views: {increment: 1}}})
        res.json(post)
    } catch (error) {
        next(error)
    }
})

router.post('/posts', authMiddleware, async (req, res, next) => {
    try {
        const createdPost = await prisma.post.create({data: req.body})
        res.json(createdPost)
        
    } catch (error) {
        next(error)
    }
})

router.patch('/posts/:id', authMiddleware, async (req, res, next) => {
    try {
        const {id} = req.params
        const updatedPost = await prisma.post.update({where:{ id: Number(id)}, data: req.body, include: {User : true}}) 
        res.json(updatedPost)
    } catch (error) {
        next(error)
    }
})

router.delete('/posts/:id', authMiddleware, async (req, res, next) => {
    try {
        const {id} = req.params
        const deletedPost = await prisma.post.delete({where:{ id: Number(id)}, include: {User : true}}) 
        res.json(deletedPost)
    } catch (error) {
        next(error)
    }
})


module.exports = router;
