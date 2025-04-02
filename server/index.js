import app from "./src/app.js"
import connectDB from "./src/db/db.connection.js"

import {PORT,db_uri} from "./env.js"
import {db_name} from "./constants.js"

connectDB(db_uri,db_name).then(()=>{
    app.listen(PORT,()=> console.log(`Server is listening at PORT ${PORT}`));
}).catch((error)=>{
    console.error(error)
})
