const db = require('./db');

exports.getAll = async (limit, offset) => {
  return db.query('SELECT * FROM manual_po ORDER BY id DESC LIMIT ? OFFSET ?', [limit, offset]);
};

exports.getById = async (id) => {
  return db.query('SELECT * FROM manual_po WHERE id = ?', [id]);
};

exports.create = async (data) => {
  const { date, manual_po, buyer, supp, project, date_po, system_po, pic, remark } = data;
  return db.query(
    'INSERT INTO manual_po (date, manual_po, buyer, supp, project, date_po, system_po, pic, remark) VALUES (?,?,?,?,?,?,?,?,?)',
    [date, manual_po, buyer, supp, project, date_po, system_po, pic, remark]
  );
};

exports.update = async (id, data) => {
  const { date, manual_po, buyer, supp, project, date_po, system_po, pic, remark } = data;
  return db.query(
    'UPDATE manual_po SET date=?, manual_po=?, buyer=?, supp=?, project=?, date_po=?, system_po=?, pic=?, remark=? WHERE id=?',
    [date, manual_po, buyer, supp, project, date_po, system_po, pic, remark, id]
  );
};

exports.delete = async (id) => {
  return db.query('DELETE FROM manual_po WHERE id=?', [id]);
};

exports.count = async () => {
  const [[{ count }]] = await db.query('SELECT COUNT(*) as count FROM manual_po');
  return count;
};

//pencarian
exports.searchGlobal = async (keyword, limit, offset) => {
  let sql = `SELECT * FROM manual_po 
             WHERE buyer LIKE ? OR supp LIKE ? OR project LIKE ? OR manual_po LIKE ?
             ORDER BY id DESC LIMIT ? OFFSET ?`;
  const param = [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`, limit, offset];
  return db.query(sql, param);
};

exports.countSearchGlobal = async (keyword) => {
  let sql = `SELECT COUNT(*) as count FROM manual_po 
             WHERE buyer LIKE ? OR supp LIKE ? OR project LIKE ? OR manual_po LIKE ?`;
  const param = [`%${keyword}%`, `%${keyword}%`, `%${keyword}%`, `%${keyword}%`];
  const [[{ count }]] = await db.query(sql, param);
  return count;
};

