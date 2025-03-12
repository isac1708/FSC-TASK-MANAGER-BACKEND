const notFounderror = (res,message) => res.status(404).send({error: message});

module.exports = {
    notFounderror
}