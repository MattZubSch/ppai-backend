// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + "./.data/base.db");

// definicion del modelo de datos
const Cliente = sequelize.define('Cliente', {
  idCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  dni: {
      type: DataTypes.INTEGER,
  },
  nombreCompleto: {
      type: DataTypes.STRING,
  },
  nroCelular: {
      type: DataTypes.STRING,
  }
},
{
  timestamps: false, // Esta opción debe estar fuera del objeto de definición de propiedades
  freezeTableName: true // Evita la pluralización automática del nombre de la tabla
}
);

const Llamada = sequelize.define('Llamada', {
  idLlamada: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  descripcionOperador: {
      type: DataTypes.STRING,
  },
  detalleAccionRequerida: {
      type: DataTypes.STRING,
  },
  duracion: {
      type: DataTypes.STRING,
  },
  encuestaEnviada: {
      type: DataTypes.BOOLEAN,
  },
  observacionAuditor: {
      type: DataTypes.STRING,
  },
  idCliente: {
      type: DataTypes.INTEGER,
  }
},
{
  timestamps: false, // Esta opción debe estar fuera del objeto de definición de propiedades
  freezeTableName: true // Evita la pluralización automática del nombre de la tabla
}
);

Llamada.belongsTo(Cliente, { foreignKey: 'idCliente' });


const Estado = sequelize.define('Estado', {
  idEstado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
  },
},
{
  timestamps: false, // Esta opción debe estar fuera del objeto de definición de propiedades
  freezeTableName: true // Evita la pluralización automática del nombre de la tabla
}
);

const CambioEstado = sequelize.define('CambioEstado', {
  idCambioEstado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fechaHoraInicio: {
    type: DataTypes.STRING,
  },
  fechaHoraFin: {
    type: DataTypes.STRING,
  },
  idEstado: {
    type: DataTypes.INTEGER,
  },
  idLlamada: {
    type: DataTypes.INTEGER,
  },
},
{
  timestamps: false, // Esta opción debe estar fuera del objeto de definición de propiedades
  freezeTableName: true // Evita la pluralización automática del nombre de la tabla
});


CambioEstado.belongsTo(Estado, { foreignKey: 'idEstado' });
CambioEstado.belongsTo(Llamada, { foreignKey: 'idLlamada' });


const Pregunta = sequelize.define('Pregunta', {
  idPregunta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  descripcion: {
      type: DataTypes.STRING,
  }
},
{
  timestamps: false, // Esta opción debe estar fuera del objeto de definición de propiedades
  freezeTableName: true // Evita la pluralización automática del nombre de la tabla
});

const Encuesta = sequelize.define('Encuesta', {
  idEncuesta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  descripcion: {
      type: DataTypes.STRING,
  },
  fechaFinVigencia: {
      type: DataTypes.STRING,
  },
  idPregunta1: {
      type: DataTypes.INTEGER,
  },
  idPregunta2: {
      type: DataTypes.INTEGER,
  },
  idPregunta3: {
      type: DataTypes.INTEGER,
  },
},
{
  timestamps: false, // Esta opción debe estar fuera del objeto de definición de propiedades
  freezeTableName: true // Evita la pluralización automática del nombre de la tabla
});

const RespuestaPosible = sequelize.define('RespuestaPosible', {
  idRespuestaPosible: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  descripcion: {
      type: DataTypes.STRING,
  },
  valor: {
      type: DataTypes.INTEGER,
  },
  idPregunta: {
      type: DataTypes.INTEGER,
  },
},
{
  timestamps: false, // Esta opción debe estar fuera del objeto de definición de propiedades
  freezeTableName: true // Evita la pluralización automática del nombre de la tabla
});

RespuestaPosible.belongsTo(Pregunta, { foreignKey: 'idPregunta' });

const RespuestaCliente = sequelize.define('RespuestaCliente', {
  idRespuestaCliente: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
  },
  fechaEncuesta: {
      type: DataTypes.STRING,
  },
  idRespuesta: {
      type: DataTypes.INTEGER,
  },
  idLlamada: {
      type: DataTypes.INTEGER,
  },
},
{
  timestamps: false, // Esta opción debe estar fuera del objeto de definición de propiedades
  freezeTableName: true // Evita la pluralización automática del nombre de la tabla
});

RespuestaCliente.belongsTo(RespuestaPosible, { foreignKey: 'idRespuesta', targetKey: 'idRespuestaPosible' });
RespuestaCliente.belongsTo(Llamada, { foreignKey: 'idLlamada' });


module.exports = {
  sequelize,
  Cliente,
  CambioEstado,
  Estado,
  Encuesta,
  Llamada,
  Pregunta,
  RespuestaCliente,
  RespuestaPosible
};
