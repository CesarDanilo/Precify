'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

// Carrega config.js (em vez de .json)
const config = require(path.join(__dirname, '..', 'config', 'config.js'))[env];

const db = {};

// 1. Instância do Sequelize  ────────────────────────────────────────────────
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, {
    host:   config.host,
    dialect: config.dialect,
    port:    config.port,
    // adicione opções extras se precisar
  });
}

// 2. Carrega todos os modelos da pasta ──────────────────────────────────────
fs.readdirSync(__dirname)
  .filter(file =>
    file.indexOf('.') !== 0 &&              // ignora arquivos ocultos
    file !== basename &&                    // ignora este index.js
    file.slice(-3) === '.js' &&             // só *.js
    !file.endsWith('.test.js')              // ignora testes
  )
  .forEach(file => {
    const modelPath = path.join(__dirname, file);

    try {
      const modelDefiner = require(modelPath);

      // Se não exportar uma função, pula.
      if (typeof modelDefiner !== 'function') {
        console.warn(`⚠️  ${file} não exporta uma função de modelo. Ignorando.`);
        return;
      }

      const model = modelDefiner(sequelize, Sequelize.DataTypes);

      // Se não retornar um modelo válido, pula.
      if (!model || !model.name) {
        console.warn(`⚠️  ${file} não retornou um Model Sequelize válido. Ignorando.`);
        return;
      }

      db[model.name] = model; // ← agora é seguro
      console.log(`✅ Modelo carregado: ${model.name}`);

    } catch (err) {
      console.error(`❌ Erro ao carregar ${file}: ${err.message}`);
    }
  });

// 3. Executa associações ────────────────────────────────────────────────────
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 4. Exporta ────────────────────────────────────────────────────────────────
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
