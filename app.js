import express, { request, response } from 'express'
import mongoose from 'mongoose'
import { logger } from './middlewares/logger.js' 
import path from 'path'
import { fileURLToPath } from 'url'
import { error } from 'console'
import favicon from 'serve-favicon'
import Reports from './models/reports.js'
import methodOverride from 'method-override'

const app = express()
const PORT = 3000

try {
    mongoose.connect('mongodb://127.0.0.1:27017/communityVoiceDatabse', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}

// seting the engine to ejs
app.set('view engine', 'ejs')
app.set('views', './pages')

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'pages' directory
app.use('/', express.static(path.join(__dirname, 'pages')));
app.use(favicon(path.join(__dirname, 'pages', 'favicon.ico')));
app.use(methodOverride("_method"));

// this route is for the reporting page and will respond with directing to the track page
app.post('/report',  (request, response) => {
    const { name, email, category, address, details } = request.body;

    if (!name || !email || !category || !address || !details ) {
        response.render('track');
        console.log("missing details")
        return
    }

    const reports = new Reports({
        name,
        email,
        category,
        address,
        details
    });

    reports.save()
        .then(() => {
            response.status(201).render('track', {reports: reports})
            console.log("report created")
        })
        .catch(err => response.status(500).send('Error creating report: ' + err.message));
});

// setting get route to read data from database
app.get("/track", async (request, response) => {
    try{
        const reports = await Reports.find().sort({ _id: -1 }).limit(1);
        console.log("Reports:", reports);
        response.render('track', { reports });
    } catch (error){
        console.error(error);
    }
});

// Setting GET route to edit data from database
app.get("/edit/:id", async (request, response) => {
    try {
        console.log(request.params.id);
        // Fetch the document by ID without updating it
        const report = await Reports.findById(request.params.id);
        
        if (!report) {
            return response.status(404).send("Report not found");
        }

        // Render the edit page with the fetched document
        response.status(200).render('edit', { report });
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
});

// setting route for report with id
app.get("/track/:id", async (request, response) => {
    try {
        const report = await Reports.findById(request.params.id);

        if (!report) {
            return response.status(404).send("Report not found");
        }

        response.status(200).render("track", { report });
    } catch (error) {
        console.error(error);
        response.status(500).send(error.message);
    }
});

// update report
app.put("/edit/:id", async (request, response) => {
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
})

app.delete("/delete/:id", async (request, response) => {
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
})

// the existing route handling code
app.get('/:page', (request, response) => {
    const page = request.params.page;
    response.render(`${page}`)
});


// listener route
app.listen(PORT, () => {
    console.log(`starting server on port ${PORT}`)
})