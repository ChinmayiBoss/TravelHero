import express from 'express';
//validators
import paramsValidator from '../validators/params-validator';
import signupAdmin from '../controllers/admin-management/signup-admin';
import loginAdmin from '../controllers/admin-management/login-admin';
import getAdmin from '../controllers/admin-management/get-admin';
import listAdmin from '../controllers/admin-management/list-admin';
import updateAdmin from '../controllers/admin-management/update-admin';
import adminValidator from '../validators/admin-validator';
import deleteAdmin from '../controllers/admin-management/delete-admin';
import listUser from '../controllers/user-management/list-user';
import getUser from '../../user/controllers/user-management/get-user';
import deleteUser from '../controllers/user-management/delete-user';
import unblockUser from '../controllers/user-management/unblock-user';
import blockUser from '../controllers/user-management/block-user';
import acceptKycDetails from '../controllers/user-management/accept-kyc-details';
import rejectKycDetails from '../controllers/user-management/reject-kyc-details';
import logout from '../../user/controllers/user-management/logout';
import adminAuthentication from '../authentication/admin-authentication';
import countryUpdateController from '../controllers/country-management/country-update-controller';
import stateUpdateController from '../controllers/country-management/state-update-controller';
import cityUpdateController from '../controllers/country-management/city-update-controller';
import GetCountryByIdController from '../controllers/country-management/Get-country-by-id-controller';



const adminRouter = express.Router();

/**
 * admin routes
 * @description admin routes
 */

//admin management routes
adminRouter.post('/signup', signupAdmin.create); // [adminValidator.signup],
adminRouter.post('/login', loginAdmin.get); //[adminValidator.login],
adminRouter.get('/details/:id', [adminAuthentication.check, paramsValidator.validate], getAdmin.get);
adminRouter.get('/list', [adminAuthentication.check], listAdmin.list)
adminRouter.patch('/update/:id', [adminAuthentication.check, paramsValidator.validate, adminValidator.update], updateAdmin.update)
adminRouter.delete('/delete/:id', [adminAuthentication.check, paramsValidator.validate], deleteAdmin.delete)
adminRouter.delete('/logout', [adminAuthentication.check], logout.delete);


//user management
adminRouter.get('/user-list', [adminAuthentication.check], listUser.list);
adminRouter.get('/user-details/:id', [paramsValidator.validate], getUser.get)
adminRouter.delete('/delete-user/:id', [paramsValidator.validate], deleteUser.delete);
adminRouter.patch('/block-user/:id', [paramsValidator.validate], blockUser.update);
adminRouter.patch('/unblock-user/:id', [paramsValidator.validate], unblockUser.update);
adminRouter.patch('/accept-user-kyc/:id', [paramsValidator.validate], acceptKycDetails.update);
adminRouter.patch('/reject-user-kyc/:id', [paramsValidator.validate], rejectKycDetails.update);


adminRouter.post('/add-country', countryUpdateController.create);
adminRouter.post('/add-state', stateUpdateController.create);
adminRouter.post('/add-city', cityUpdateController.create);
adminRouter.get('/get-country', GetCountryByIdController.get);


module.exports = adminRouter;