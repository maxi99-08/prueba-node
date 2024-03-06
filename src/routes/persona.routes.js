import express from 'express'
import { createOrUpdate, deletePersonaById, getPersonaById, readAllPersonas } from '../database/db.js'

const router = express.Router()

// READ ALL personas
router.get('/personas', async(req, res) => {
    try{
        const { success, data } = await readAllPersonas()

        if(success){
            res.render('personas/list', {personas: data})
        }
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})

// Get Persona by ID
router.get('/persona/:id', async(req, res) => {
    const { id } = req.params
    const { success, data } = await getPersonaById(id)
    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Create Persona
router.post('/persona', async(req, res) => {

    try{
        let obj = req.body
        obj.id = parseInt(obj.id)

        const { success, data } = await createOrUpdate(obj)
        if(success){
            res.redirect('/personas');
        }
    }
    catch(e){
        res.status(500).json({message: e.message})
    }
})

router.get('/add', async(req, res) => {
    res.render('personas/add')
})

router.get('/edit', async(req, res) => {
    res.render('personas/edit')
})

// Update Persona by ID
router.put('/persona/:id', async(req, res) => {
    const persona = req.body
    const { id } = req.params
    persona.id = parseInt(id)

    const { success, data } = await createOrUpdate(persona)

    if(success){
        return res.json({success, data})
    }

    return res.status(500).json({success: false, message: "Error"})
})


// Delete Persona by Id
router.get('/deletepersona/:id', async (req, res) => {
    const { id } = req.params
    const { success, data } = await deletePersonaById(id)
    if (success) {
        res.render('personas')
    }
    return res.status(500).json({ success: false, message: 'Error'})
})
  



export default router