module.exports = (sequelize, type) => {
    return sequelize.define('User', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        username: type.STRING,
        password: type.STRING,
        active: type.BOOLEAN
    })
}