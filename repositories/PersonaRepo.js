const Respuesta = require("../models/Respuesta");
const MySQLClient = require("../data/AplicationDbContext");

class PersonaRepo {
  _db = new MySQLClient();
  _response = new Respuesta();
  CatchError(res, error) {
    this._response.displayMessage = "Ocurrio un Error al Realizar la Operación";
    this._response.errorMessage = { error };
    res.status(400).json(this._response);
  }
  async CreateUpdate(res, persona) {
    this._response = new Respuesta();
    if (this._db.Conect) {
      if (persona.id > 0) {
        this._response.result = await this._db.Update(
          "persona",
          persona.id,
          persona,
          (error, result) => {
            if (error) this.CatchError(res, error);
            if (result.affectedRows) 
            {
              this._response.isSuccess = true;
            this._response.displayMessage =
              "Se ha Actualizado el Registro de la Persona";
              this._response.result = result.message;
            res.status(201).json(this._response);}
          }
        );
      } else {
        this._response.result = await this._db.Insert(
          "persona",
          persona,
          (error, result) => {
            if (error) this.CatchError(res, error);
            this._response.isSuccess = true;
            this._response.displayMessage =
              "Se ha Registrado con Éxito la Persona";
              this._response.result = 'id: ' + result.insertId;
            res.status(200).json(this._response);
          }
        );
      }
    } else {
      this._response.errorMessage = "Error en la Conexion con SGBD MySQL.";
      res.status(502).json(this._response);
    }
  }

  async Delete(res, id) {
    this._response = new Respuesta();
    if (this._db.Conect) {
      await  this._db.Delete(
        "persona",
        id,
        (error, result) => {
          if (error) this.CatchError(res, error);
          this._response.isSuccess = true;
          this._response.displayMessage =
            "Se ha Eliminado el Registro de la Persona con ID: " +id ;
            this._response.result = result.message;
          res.status(200).json(this._response);
        }
      );
    } else {
      this._response.errorMessage = "Error en la Conexion con SGBD MySQL.";
      res.status(502).json(this._response);
    }
  }
  async GetAll(res) {
    this._response = new Respuesta();
    if (this._db.Conect) {
      await this._db.Select("persona", async (error, result) => {
        if (error) this.CatchError(res,error);
        this._response.isSuccess = true;
        this._response.displayMessage = "Lista de Personas";
        this._response.result = JSON.stringify(await result);
        res.status(200).json(this._response);
      });
    } else {
      this._response.errorMessage = "Error en la Conexion con SGBD MySQL.";
      res.status(502).json(this._response);
    }
  }
  async GetByName(res, nombre) {
    this._response = new Respuesta();
    if (this._db.Conect) {
       this._db.SelectBy(
        "persona",
        "nombre",
        nombre,
        async (error, result) => {
          if (error) this.CatchError(res,error);
          this._response.isSuccess = true;
          this._response.displayMessage = "Lista de Personas por Nombre";
          this._response.result = JSON.stringify(await result).replace("\\","");
          res.status(200).json(this._response);
        }
      );
    } else {
      this._response.errorMessage = "Error en la Conexion con SGBD MySQL.";
      res.status(502).json(this._response);
    }
  }
  async GetByPaterno(apaterno) {
    this._response = new Respuesta();
    if (this._db.Conect) {
      await this._db.SelectBy(
        "persona",
        "apaterno",
        apaterno,
        async (error, result) => {
          if (error) this.CatchError(res,error);
          this._response.isSuccess = true;
          this._response.displayMessage =
            "Lista de Personas por Apellido Paterno";
          this._response.result = JSON.stringify(await result).replace("\\","");
          res.status(200).json(this._response);
        }
      );
    } else {
      this._response.errorMessage = "Error en la Conexion con SGBD MySQL.";
      res.status(502).json(this._response);
    }
  }
  async GetByMaterno(res, amaterno) {
    this._response = new Respuesta();
    if (this._db.Conect) {
      await this._db.SelectBy(
        "persona",
        "amaterno",
        amaterno,
        async (error, result) => {
          if (error) this.CatchError(res,error);
          this._response.isSuccess = true;
          this._response.displayMessage =
            "Lista de Personas por Apellido Materno";
          this._response.result = JSON.stringify(await result).replace("\\","");
          res.status(200).json(this._response);
        }
      );
    } else {
      this._response.errorMessage = "Error en la Conexion con SGBD MySQL.";
      res.status(502).json(this._response);
    }
  }
}
module.exports = PersonaRepo;
