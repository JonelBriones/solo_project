const AdminController = require('../controllers/admin.controller');
const {authenticate} = require("../config/jwt.config");

module.exports = (app) => {

    app.post('/api/admin/register', AdminController.register);
    app.post('/api/admin/login', AdminController.login);
    app.post('/api/admin/logout', AdminController.logout);
    app.get('/api/admins/admin',authenticate,AdminController.getLoggedInAdmin) 
    app.get('/api/admins/',AdminController.getAllAdmins) 
    app.put('/api/admin/edit/:id',AdminController.updateAdmin) 
}