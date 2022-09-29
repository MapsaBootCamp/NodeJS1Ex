import { db } from "./database.js";

///////////   Async db.run

async function asyncDbRun(sql, params) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

///////////   Async db.run Error handler

export async function asyncRun(sql, params) {
  try {
    await asyncDbRun(sql, params);
  } catch (err) {
    throw err;
  }
}

///////////   Async db.get

async function asyncDbGet(sql, params) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}

///////////   Async db.get Error handler

export async function asyncGet(sql, params) {
  let result = [null, null];
  try {
    result[1] = await asyncDbGet(sql, params);
  } catch (err) {
    result[0] = err;
  }
  return result;
}

///////////   Async db.all

async function asyncDbAll(sql, params) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

///////////   Async db.all Error handler

export async function asyncAll(sql, params) {
  let result = [null, null];
  try {
    result[1] = await asyncDbAll(sql, params);
  } catch (err) {
    result[0] = err;
  }
  return result;
}
