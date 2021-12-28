const express = require('express')
const {
    connection
} = require('../helper/conf.js')
const router = express.Router()

//GET
//Get all users
router.get('/', (req, res) => {
    const sql =
    `SELECT id, lastname, firstname, email, role, gender
    FROM user_of_bo`
    connection.query(sql, (err, result) => {
        if (err) {
            res.status(500).send('Erreur dans la récupération des utilisateurs')
        } else {
            res.send(result)
        }
    })
})

// Get one user by id
router.get('/:id', (req, res) => {
    const idUser = req.params.id
    const sql =
    `SELECT id, lastname, firstname, email, role, gender
    FROM user_of_bo
    WHERE id = ?`
    connection.query(sql, [idUser], (err, result) => {
        if (err) {
            res.status(500).send("Erreur dans la récupération d'un utilisateur")
        } else {
            res.status(200).send(result[0])
        }
    })
})

//UPDATE
//Update an user
router.put('/:id', (req, res) => {
    const formData = req.body
    const idUser = req.params.id
    const sql =
    `UPDATE user_of_bo 
    SET ?
    WHERE id = ?`
    connection.query(sql, [formData, idUser], (err, results) => {
        if (err) {
            res.status(500).send("Erreur dans la modification d'un utilisateur")
        } else {
            res.sendStatus(200)
        }
    })
})

//DELETE
//delete an user
router.delete('/:id', (req,res) => {
    const idUser = req.params.id
    const sql = 
    `DELETE FROM user_of_bo
    WHERE id = ?`
    connection.query(sql, [idUser], err => {
      if (err) {
        res.status(500).send("Erreur lors de la suppresion d'un utilisateur")
      } else {
        res.sendStatus(200)
      }
    })
  })
  
module.exports = router