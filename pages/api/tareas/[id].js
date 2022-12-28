import { pool } from "../../../config/database";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await gettarea(req, res);
    case "DELETE":
      return await deletetarea(req, res);
    case "PUT":
      return await updatetarea(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const gettarea = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tareas WHERE id = ?", [
      req.query.id,
    ]);
    return res.status(200).json(result[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deletetarea = async (req, res) => {
  try {
    await pool.query("DELETE FROM tareas WHERE id = ?", [req.query.id]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updatetarea = async (req, res) => {
  try {
    console.log(req.body)
    await pool.query("UPDATE tareas SET ? WHERE id = ?", [
      req.body,
      req.query.id,
    ]);
    return res.status(204).json();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};