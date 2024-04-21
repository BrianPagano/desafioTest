const { Router } = require('express')
const authMiddleware = require('../middlewares/private-acces-middleware')
const publicAcces = require('../middlewares/public-acces-middleware')
const { authTokenMiddleware } = require('../utils/jwt.util')
const authorization = require('../middlewares/authorization-middleware')

const router = Router()

router.get('/login', publicAcces , async (req, res) => {
    try {
     res.render ('login', {style:'style.css'})   
    } catch (error) {
        req.logger.error ('Error al loguearse:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/signup', publicAcces , async (req, res) => {
    try {
     res.render ('signup', {style:'style.css'})   
    } catch (error) {
        req.logger.error ('Error en la registracion del usuario:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const { user } = req.session
        res.render ('profile', { user , style:'style.css'})   
    } catch (error) {
        req.logger.error ('Error en la authenticacion de usuario:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/forgotPassword', authTokenMiddleware, async (req, res) => {
    try {
        res.render ('forgotPassword', { style:'style.css'})   
    } catch (error) {
        req.logger.error ('Error al resetear password:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/recoveryKey', async (req, res) => {
    try {
        res.render ('recoveryKey', { style:'style.css'})   
    } catch (error) {
        req.logger.error ('Error al recuperar la clave:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get ('/loggerTest', async (req,res) => {
    try {
        req.logger.fatal('Esto es fatal')
        req.logger.error('Esto es error')
        req.logger.warning('Esto es warning')
        req.logger.info('Esto es Info')
        req.logger.http('Esto es http')
        req.logger.debug('Esto es debug')
        res.json({response: 'loggerTest'})
    } catch (error) {
        req.logger.error ('Error en el loggerTest:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }  
})

router.get('/addProduct', authorization(['admin', 'premium']), async (req, res) => {
    try {
     const { user } = req.session
     res.render ('addProduct', {
        user,
        style:'style.css'})   
    } catch (error) {
        req.logger.error ('Error al crear productos:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

router.get('/deleteProduct', authorization(['admin', 'premium']), async (req, res) => {
    try {
     const { user } = req.session
     res.render ('deleteProduct', {
        user,
        style:'style.css'})   
    } catch (error) {
        req.logger.error ('Error al borrar productos:', error)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})
    
module.exports = router