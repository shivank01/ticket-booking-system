const client = require('./app')

async function exists(id) {
    try{
        console.log("2");
        // result = await client.lrange('seats_'+id, 0, -1);
        await client.lrange('seats_'+id, 0, -1, function(err, res) {
            console.log(res);
            return res;
        });
    } catch(err) {
        console.log(err);
    }
}

async function set(id, seats) {
    // var seatArr = [];
    // for(var i = 0; i < seats.length; i++)
    // {
    //     seatArr = seatArr.concat(seats[i]);
    // }
    try{
        result = await client.rpush('seats_'+id, ...seats);
        console.log(result);
    } catch(err) {
        console.log(err)
    }
    
}

async function get(id) {
    try{
        result = await client.lrange('seats_'+id, 0, -1);
        return result;
    } catch(err) {
        console.log(err)
    }
    
}

async function update(id, seatno, val) {
    // let r = (seatno-1)%4;
    // let c = seatno -1 - 4*r;
    // let redisSeat = 10*c +r
    try{
        result = await client.lset('seats_'+id, seatno, val);
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    exists: exists,
    set : set,
    update : update,
    get : get
};