module.exports = (app) => {
    app.get("api/properties", (req, res) => {
        res.status(201).json({
            message: "my properties",
        });
    });
};
