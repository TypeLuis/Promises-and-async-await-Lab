// Importing database functions. DO NOT MODIFY THIS LINE.
// import { central, db1, db2, db3, vault } from "./database.mjs";
import database from "./database.mjs";

const { central, db1, db2, db3, vault } = database

async function getUserData(id) {
  const dbs = {
    db1: db1,
    db2: db2,
    db3: db3
  };

  try {

    /*
        If id > a certain number, central returns the DB that id belongs to
    */
    const dbName = await central(id)

    //  returns an array of both promises, to get both values in array
    //  we're destructuring them to independent variables
    /*
        Same as this if we used results = etc..
        const basic = results[0];
        const personal = results[1];
    */
    const [basic, personal] = await Promise.all([
    dbs[dbName](id), // username, website, company
    vault(id)        // name, email, address, phone
    ])

    //  console.log(basic, personal)

    return {
        id,
        ...personal,
        ...basic
    }
  } catch (error) {
        return Promise.reject(error)
  }
}

(async () => {
    console.log(await getUserData(1))
    // console.log(await getUserData(2))
    // console.log(await getUserData(3))
    // console.log(await getUserData(4))
    // console.log(await getUserData(5))
    // console.log(await getUserData(6))
    // console.log(await getUserData(7))
})()

// console.log()
// getUserData(1)