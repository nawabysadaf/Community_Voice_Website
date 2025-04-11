import express from 'express';
import Reports from '../models/reports.js';

const router = express.Router();

// this route is for the reporting page and will respond with directing to the track page
router.post('/track', (request, response) => {
    const { name, email, category, address, details } = request.body;

    if (!name || !email || !category || !address || !details ) {
        response.render('track', {report: [report]});
        console.log("missing details");
        return
    }

    const report = new Reports({
        name,
        email,
        category,
        address,
        details
    });

    report.save()
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