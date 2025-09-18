const ExcelJS = require('exceljs');
const ManualPo = require('../models/manualPo');


exports.getAll = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  const offset = (page - 1) * perPage;

  try {
    const [rows] = await ManualPo.getAll(perPage, offset);
    const total = await ManualPo.count();

    res.json({
      data: rows,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await ManualPo.getById(id);
    if (!rows.length) return res.status(404).json({ message: 'Data not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    await ManualPo.create(req.body);
    res.json({ message: 'Manual PO created successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    await ManualPo.update(id, req.body);
    res.json({ message: 'Manual PO updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    await ManualPo.delete(id);
    res.json({ message: 'Manual PO deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

//pencarian
exports.searchGlobal = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 20;
  const offset = (page - 1) * perPage;
  const { q } = req.query;

  try {
    const [rows] = await ManualPo.searchGlobal(q || '', perPage, offset);
    const total = await ManualPo.countSearchGlobal(q || '');
    res.json({
      data: rows,
      total,
      page,
      perPage,
      totalPages: Math.ceil(total / perPage)
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.exportExcel = async (req, res) => {
  const { q } = req.query; // keyword pencarian
  try {
    let rows;
    if (q && q.trim() !== "") {
      // export semua hasil pencarian (tanpa limit)
      [rows] = await ManualPo.searchGlobal(q, 100000, 0); 
    } else {
      // export semua data (tanpa limit)
      [rows] = await ManualPo.getAll(100000, 0);
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("ManualPO");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Date", key: "date", width: 15 },
      { header: "Manual PO", key: "manual_po", width: 20 },
      { header: "Buyer", key: "buyer", width: 20 },
      { header: "Supplier", key: "supp", width: 20 },
      { header: "Project", key: "project", width: 20 },
      { header: "Date PO", key: "date_po", width: 15 },
      { header: "System PO", key: "system_po", width: 20 },
      { header: "PIC", key: "pic", width: 15 },
      { header: "Remark", key: "remark", width: 30 }
    ];

    rows.forEach(row => worksheet.addRow(row));

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=manual_po.xlsx"
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



