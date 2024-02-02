import { app } from "./infra/http /app";
// import { connection } from "./infra/typeorm/models";


// connection.initialize()
//     .then(() => {
//         app.listen(process.env.PORT || 5000, () => {
//           console.log(`[App]: Server listening on ${process.env.PORT || 5000}`)
//         });
//     })
//     .catch((error) => console.log(error))

app.listen(process.env.PORT || 5000, () => {
    console.log(`[App]: Server listening on ${process.env.PORT || 5000}`)
});