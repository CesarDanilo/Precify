'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Favoritos extends Model {
        static associate(models) {
            // this.hasMany(models.Favoritos, { foreignKey: 'id_usuario' });
            // this.belongsTo(models.Planos, { foreignKey: 'plano_id' }); // Caso tenha a tabela 'planos'
        }
    }

    Favoritos.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
        },
        id_usuario: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        id_produto: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    }, {
        sequelize,
        modelName: 'Favoritos',
        tableName: 'favoritos',
        timestamps: true,
    });

    return Favoritos;
}