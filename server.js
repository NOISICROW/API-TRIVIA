const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DB_FILE = path.join(__dirname, 'database.json');

// Base de datos inicial
const datosIniciales = {
    usuarios: [
        { id: 1, username: 'admin', password: 'admin123', puntaje: 0 },
        { id: 2, username: 'santiago', password: '123', puntaje: 0 }
    ],
    preguntas: []
};

// Inicializar BD local
if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(datosIniciales, null, 2));
}

const getDB = () => JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
const saveDB = (data) => fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));

// --- API DE USUARIOS Y LOGIN ---
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const db = getDB();
    const user = db.usuarios.find(u => u.username === username && u.password === password);
    if (user) res.json({ success: true, user });
    else res.status(401).json({ success: false, msg: 'Error de login' });
});

app.get('/api/usuarios', (req, res) => res.json(getDB().usuarios));

app.post('/api/puntaje', (req, res) => {
    const { username, puntos } = req.body;
    const db = getDB();
    const user = db.usuarios.find(u => u.username === username);
    if (user) {
        if (puntos > user.puntaje) {
            user.puntaje = puntos;
            saveDB(db);
        }
        res.json({ success: true, nuevoPuntaje: user.puntaje });
    } else {
        res.status(404).json({ success: false });
    }
});

// --- API DE PREGUNTAS (CRUD) ---
app.get('/api/preguntas', (req, res) => res.json(getDB().preguntas));

app.post('/api/preguntas', (req, res) => {
    const nueva = req.body;
    const db = getDB();
    nueva.id = Date.now();
    db.preguntas.push(nueva);
    saveDB(db);
    res.json({ success: true, id: nueva.id });
});

app.delete('/api/preguntas/:id', (req, res) => {
    const db = getDB();
    db.preguntas = db.preguntas.filter(p => p.id != req.params.id);
    saveDB(db);
    res.json({ success: true });
});

// --- CONSUMO DE API EXTERNA (OPENTDB) ---
app.post('/api/importar', async (req, res) => {
    try {
        // Categoría 18 es "Science: Computers", pedimos 3 preguntas de opción múltiple
        const url = 'https://opentdb.com/api.php?amount=7&category=18&type=multiple';
        
        // Ponemos un límite de 4 segundos. Si el internet de la escuela es más lento que eso, falla a propósito.
        const apiRes = await fetch(url, { signal: AbortSignal.timeout(4000) });
        const data = await apiRes.json();

        if (data.response_code !== 0) throw new Error("La API no devolvió datos");

        const db = getDB();
        let agregadas = 0;

        // Limpiador de texto (la API manda comillas como &quot;)
        const decodificar = (texto) => texto.replace(/&quot;/g, '"').replace(/&#039;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>');

        data.results.forEach(q => {
            const pregunta = decodificar(q.question);
            const correctaTexto = decodificar(q.correct_answer);
            let opciones = q.incorrect_answers.map(decodificar);

            // Insertar la respuesta correcta en una posición aleatoria (0 al 3)
            const posicionCorrecta = Math.floor(Math.random() * (opciones.length + 1));
            opciones.splice(posicionCorrecta, 0, correctaTexto);

            db.preguntas.push({
                id: Date.now() + agregadas,
                pregunta: pregunta,
                opciones: opciones,
                correcta: posicionCorrecta
            });
            agregadas++;
        });

        saveDB(db);
        res.json({ success: true, msg: `¡Éxito! Se importaron ${agregadas} preguntas de la API.` });

    } catch (error) {
        console.error("Fallo la API externa (Internet lento):", error.message);
        
        //  SISTEMA DE EMERGENCIA: Si no hay internet, mete una pregunta hardcodeada
        const db = getDB();
        db.preguntas.push({
            id: Date.now(),
            pregunta: "💾 [BACKUP LOCAL] ¿Qué significa API?",
            opciones: ["Advanced Program Integration", "Application Programming Interface", "Automated Process Interaction"],
            correcta: 1
        });
        saveDB(db);

        // Devolvemos success: true para que no explote, pero avisamos del internet lento
        res.json({ success: true, msg: "Internet inestable detectado. Se cargó una pregunta de respaldo local." });
    }
});

app.listen(3000, () => console.log(" SERVIDOR LISTO EN PUERTO 3000 (API OPENTDB CONFIGURADA)"));