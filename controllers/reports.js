import express from 'express';
import Reports from '../models/reports.js';
import { body, validationResult } from 'express-validator';

const router = express.Router();

// this route is for the reporting page and will respond with directing to the track page
router.post('/track', 
    [
        // Express Validator rules
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('category').notEmpty().withMessage('Category is required'),
        body('address').notEmpty().withMessage('Address is required'),
        body('details').isLength({ min: 10 }).withMessage('Details must be at least 10 characters long')
    ],    
    async (request, response) => {

        // Check for validation errors
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            // If validation fails, render the form with error messages
            return response.status(400).render('track', {
                errors: errors.array(),
                report: [],
            });
        }

        const { name, email, category, address, details } = request.body;
        console.log('🚀 Attempting to save report...');
        console.log(request.body.report)
        const report = new Reports({
            name,
            email,
            category,
            address,
            details
        });

        await report.save()
            .then(() => {
                response.status(201).render('track', {report: [report]});
                console.log("report created");
            })
            .catch(err => response.status(500).send('Error creating report: ' + err.message));
});

// setting get route to read data from database
router.get("/track", async (request, response) => {
    try{
        const report = await Reports.find().sort({ _id: -1 }).limit(1);
        response.render('track', { report });
    } catch (error){
        console.error(error);
    }
});

// Setting GET route to edit data from database
router.get("/edit/:id", async (request, response) => {
    try {
        console.log(request.params.id);
        // Fetch the document by ID without updating it
        const report = await Reports.findById(request.params.id);
        
        if (!report) {
            return response.status(404).send("Report not found");
        }

        // Render the edit page with the fetched document
        response.status(200).render('edit', { report: report });
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
});

// setting route for report with id
router.get("/track/:id", async (request, response) => {
    try {
        const report = await Reports.findById(request.params.id);

        if (!report) {
            return response.status(404).send("Report not found");
        }

        response.status(200).render("track", { report: [report] });
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
});

// update report
router.put("/edit/:id", async (request, response) => {
    try {
        const report = await Reports.findByIdAndUpdate(request.params.id, {$set: request.body}, {new: true, runValidators: true})
        if(!report) {
            return response.status(404).send("Report not found");
        }
        response.redirect(`/track/${report._id}`)
    }catch(error) {
        console.error(error);
        response.status(500).send(error.message);
    }
});

// delete report
router.delete("/delete/:id", async (request, response) => {
    try {
        const report = await Reports.findByIdAndDelete(request.params.id);
        if(!report) {
            return response.status(404).send("Report not found");
        }
        response.redirect("/home")
    }catch(error) {
        console.log(error);
        response.status(500).send(error.message);
    }
});

export default router;