'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Produtos extends Model {
        static associate(models) {
            // this.hasMany(models.Favoritos, { foreignKey: 'id_usuario' });
            // this.belongsTo(models.Planos, { foreignKey: 'plano_id' }); // Caso tenha a tabela 'planos'
        }
    }
    Produtos.init({
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        preco: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        imagem: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }

    }, {
        sequelize,
        modelName: 'Produtos',
        tableName: 'produtos',
        timestamps: true,
    });

    return Produtos;

}