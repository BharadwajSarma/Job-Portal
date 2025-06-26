import express from 'express'
import upload from "../config/multer.js"

import { ChangeJobApplicationsStatus, changeVisibility, getCompanyData,getCompanyJobApplicants,getCompanyPostedJobs,loginCompany,postJob,registerCompany } from "../controllers/companyController.js"
import { protectCompany } from '../middleware/authMiddleware.js'
const router =express.Router()

//Register a company
router.post('/register',upload.single('image'),registerCompany)

//Company login
router.post('/login',loginCompany)

//Get company data
router.get('/company',protectCompany,getCompanyData)

//Post a job
router.post('/post-job',protectCompany,postJob)

//Get Application Data of Company
router.get('/applicants',protectCompany,getCompanyJobApplicants)

//Get Company JOb List
router.get('/list-jobs',protectCompany,getCompanyPostedJobs)

//Change Applications Status
router.post('/change-status',protectCompany, ChangeJobApplicationsStatus)

//Change Applications Visiblity
router.post('/change-visibility',protectCompany, changeVisibility)

export default router