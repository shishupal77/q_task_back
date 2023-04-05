const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')



router.post('/create',auth,userCtrl.create)

router.get('/read',auth,userCtrl.read)

router.put('/update',auth, userCtrl.update)

router.delete('/delete/:id',auth,userCtrl.delete)


module.exports = router