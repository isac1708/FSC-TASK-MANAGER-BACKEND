const notFounderror = (res,message) => res.status(404).send({error: message});
const objectIDerror = (res) => res.status(500).send("ID inválido");

module.exports = {
    notFounderror,
    objectIDerror,
}