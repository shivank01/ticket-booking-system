/* Implementation of different function to access the redis DB */

const client = require('./app')

//check if busID exists
async function exists(id) {
    try{
        var x= await client.exists("seats_"+id);
        return x;
    } catch(err) {
        console.log(err);
    }
}

//insert seats of bus
async function set(id, seats) {
    try{
        await client.rpush('seats_'+id, ...seats);
    } catch(err) {
        console.log(err)
    }
    
}

//get seats of bus
async function get(id) {
    try{
        result = await client.lrange('seats_'+id, 0, -1);
        return result;
    } catch(err) {
        console.log(err)
    }
    
}

//update the seat status
async function update(id, seatno, val) {
    try{
        result = await client.lset('seats_'+id, seatno, val);
    } catch(err) {
        console.log(err)
    }
}

//delete the key
async function del(id) {
    try{
        await client.del('seats_'+id);
    } catch(err) {
        console.log(err);
    }
}

//export functions
module.exports = {
    exists: exists,
    set : set,
    update : update,
    get : get,
    del : del
};