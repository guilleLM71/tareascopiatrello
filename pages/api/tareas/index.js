import { pool } from "../../../config/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await gettareas(req, res);
    case "POST":
      return await savetarea(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}

const gettareas= async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM tareas");
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const savetarea = async (req, res) => {
  try {
    const {texto, lista } = req.body;
    console.log(req.body)
    const result = await pool.query("INSERT INTO tareas SET ?", 
   {  texto,
      lista}
    );

    return res.status(200).json({ ...req.body, id: result.insertId });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};