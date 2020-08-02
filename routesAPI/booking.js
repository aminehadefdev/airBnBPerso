const booking = require('../controlers/Booking')
const serviceJWT = require('../services/serviceJWT')
module.exports = (app) => {
    app.post("/api/booking/:id", serviceJWT.UserIsAutorised ,(req, res) => {
        booking.book(req, res)
    });

    app.get('/api/booking/liste', serviceJWT.UserIsAutorised, (req, res)=>{
        booking.collectionBookings(req, res)
    })
};