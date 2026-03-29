const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); 
app.use(express.json()); 

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// ==========================================
// 1. SEGURIDAD: LOGIN (Súper e Invitado)
// ==========================================
app.post('/api/login', async (req, res) => {
  try {
    const { correo, password } = req.body;
    const query = 'SELECT id, nombre_completo, correo, rol FROM usuarios WHERE correo = $1 AND password = $2';
    const resultado = await pool.query(query, [correo, password]);

    if (resultado.rows.length > 0) {
      res.json({ mensaje: 'Éxito', usuario: resultado.rows[0] });
    } else {
      res.status(401).json({ error: 'Correo o clave incorrectos.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// ==========================================
// 2. NUEVO: REGISTRO DE USUARIOS VISITANTES
// ==========================================
app.post('/api/registro', async (req, res) => {
  try {
    const { nombreCompleto, correo, password } = req.body;
    
    // Verificamos si el correo ya existe
    const existe = await pool.query('SELECT id FROM usuarios WHERE correo = $1', [correo]);
    if (existe.rows.length > 0) {
      return res.status(400).json({ error: 'Este correo ya está registrado.' });
    }

    // Insertamos (El rol será 'visitante' por defecto gracias al SQL que corrimos)
    const query = `INSERT INTO usuarios (nombre_completo, correo, password) 
                   VALUES ($1, $2, $3) RETURNING id, nombre_completo, rol`;
    const resultado = await pool.query(query, [nombreCompleto, correo, password]);
    
    res.status(201).json({ mensaje: 'Usuario creado', usuario: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo crear la cuenta.' });
  }
});

// ==========================================
// 3. GESTIÓN DE PACIENTES (CRUD)
// ==========================================
app.get('/api/pacientes', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM pacientes ORDER BY id DESC');
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer pacientes' });
  }
});

app.post('/api/pacientes', async (req, res) => {
  try {
    const { nombre, edad, fechaIngreso, tiempoTratamiento, descripcion } = req.body;
    const fEntrada = new Date(fechaIngreso);
    const fSalida = new Date(fEntrada);
    fSalida.setMonth(fEntrada.getMonth() + parseInt(tiempoTratamiento));
    
    const query = `INSERT INTO pacientes (nombre, edad, fecha_ingreso, tiempo_tratamiento_meses, descripcion_caso, fecha_salida_estimada) 
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [nombre, edad, fechaIngreso, tiempoTratamiento, descripcion, fSalida.toISOString().split('T')[0]];
    const resultado = await pool.query(query, values);
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar' });
  }
});

app.put('/api/pacientes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, edad, fechaIngreso, tiempoTratamiento, descripcion } = req.body;
    const fEntrada = new Date(fechaIngreso);
    const fSalida = new Date(fEntrada);
    fSalida.setMonth(fEntrada.getMonth() + parseInt(tiempoTratamiento));

    const query = `UPDATE pacientes SET nombre=$1, edad=$2, fecha_ingreso=$3, tiempo_tratamiento_meses=$4, 
                   descripcion_caso=$5, fecha_salida_estimada=$6 WHERE id=$7 RETURNING *`;
    const values = [nombre, edad, fechaIngreso, tiempoTratamiento, descripcion, fSalida.toISOString().split('T')[0], id];
    const resultado = await pool.query(query, values);
    res.json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar' });
  }
});

// ==========================================
// 4. BUZÓN DE MENSAJES (POST y GET)
// ==========================================

// Para que el VISITANTE envíe
app.post('/api/mensajes', async (req, res) => {
  try {
    const { usuarioId, asunto, mensaje } = req.body;
    const query = `INSERT INTO mensajes_contacto (usuario_id, asunto, mensaje) 
                   VALUES ($1, $2, $3) RETURNING *`;
    const resultado = await pool.query(query, [usuarioId, asunto, mensaje]);
    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
});

// Para que el ADMIN lea
app.get('/api/mensajes', async (req, res) => {
  try {
    const query = `SELECT m.*, u.nombre_completo as remitente, u.correo 
                   FROM mensajes_contacto m JOIN usuarios u ON m.usuario_id = u.id 
                   ORDER BY m.fecha_envio DESC`;
    const resultado = await pool.query(query);
    res.json(resultado.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al leer mensajes' });
  }
});

app.listen(port, () => console.log(`🚀 Frutos de Amor Backend en puerto ${port}`));