import express from 'express'
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import {join, dirname} from 'path'
import { fileURLToPath } from 'url';

import personaRoutes from './routes/persona.routes.js'

import dotenv from 'dotenv'
import persona from './routes/persona.routes.js'
import bodyParser from 'body-parser'

dotenv.config()

const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(bodyParser.json())

//Settings
app.set('port', process.env.PORT || 3000)
app.set('views', join(__dirname, 'views'))
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

//Middleawares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json())

//Routes
app.get('/', (req, res)=>{
    res.render('index')
})

app.use(personaRoutes)

////////------------------


const PORT = 8000

app.listen(PORT, () => {
    console.log(`Port listening on ${PORT}`)
})