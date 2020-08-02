const BookingsModel = require('../models/').Bookings
const PropertyModel = require('../models/').Property
const UserModel = require('../models/').User

class Booking {
   static async book(req, res){

    var book = await BookingsModel.update(
        {
            idUser: req.decoded.id,
            isBook: true
        },
        {where: {id: req.params.id} }
    )
    res.status(201).json({
        message : 'ok'
    })
   }
   static async collectionBookings(req, res){
       var idUser = req.decoded.id
       console.log(idUser)
       var collection = await BookingsModel.findAll({
           where: {idUser: idUser},
           include: [
               {model : PropertyModel, include: [
                   {model : UserModel, attributes: ['firstName', 'lastName', 'email', 'city', "description", "id"]}
               ]}
        ],
       })
       res.status(201).json(collection)
   }
}

module.exports = Booking