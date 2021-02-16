const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require('handlebars-helpers')
const multihelpers = hbshelpers()
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

// Initializations
const app = express()
require('./config/passport')

const formatIndex = {
    formatIndex: function(index)  {
        return index+1;
    }
}

// Settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
    helpers: {...multihelpers, ...formatIndex},
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
      }
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.login_msg = req.flash('login_msg')
    res.locals.message = req.flash('message')
    res.locals.user = req.user || null
    next()
})

// Routes
app.use(require('./routes/index'))
app.use(require('./routes/asignacion'))
app.use(require('./routes/usuario'))
app.use(require('./routes/horario'))
app.use(require('./routes/equipo'))
app.use(require('./routes/rol'))
app.use(require('./routes/equipo_asignado'))
app.use(require('./routes/zonal_asignado'))
app.use(require('./routes/grupo_gics'))
app.use(require('./routes/usuario_grupogics'))
app.use(require('./routes/tecnico'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app