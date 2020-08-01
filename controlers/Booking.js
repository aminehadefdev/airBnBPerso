const BookingsModel = require('../models/').Bookings

class Booking {
   static async book(req, res){

    var book = await BookingsModel.update(
        {
            idUser: req.decoded.id,
            isBook: true
        },
        {where: {id: req.params.id} }
    )
    console.log(book)
    res.status(201).json({
        message : 'ok'
    })
   }
}

module.exports = Booking