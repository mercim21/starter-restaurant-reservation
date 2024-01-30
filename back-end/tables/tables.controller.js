const tablesService = require("./tables.service");
const reservationsService = require("../reservations/reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");
const hasRequiredProperties = hasProperties("table_name", "capacity");

const VALID_PROPERTIES = ["table_name", "capacity", "reservation_id"];

// list table/s
async function list(req, res, next) {
  const data = await tablesService.list();
  res.status(200).json({ data });
}

// create a table
async function create(req, res, next) {
  const data = await tablesService.create(req.body.data);
  res.status(201).json({ data });
}

// update a table
async function update(req, res) {
    const updatedTable = {
      ...req.body.data,
      table_id: res.locals.table.table_id,
    };
  
    const updatedReservation = {
      ...res.locals.reservation,
      reservation_id: res.locals.reservation.reservation_id,
      status: "seated",
    };
    await reservationsService.updateStatus(updatedReservation);
  
    const data = await tablesService.update(updatedTable);
    res.status(200).json({ data });
  }
  
  // read a table
  async function read(req, res, next) {
    res.status(200).json({ data: res.locals.table });
  }
  
  // delete a table
  async function destroy(req, res, next) {
    const updatedTable = {
      ...res.locals.table,
      reservation_id: null,
    };
  
    const reservation_id = res.locals.table.reservation_id;
    const reservation = await reservationsService.read(reservation_id);
  
    const updatedReservation = {
      ...reservation,
      status: "finished",
    };
  
    const data = await tablesService.update(updatedTable);
    await reservationsService.updateStatus(updatedReservation);
    res.json({ data });
  }
  