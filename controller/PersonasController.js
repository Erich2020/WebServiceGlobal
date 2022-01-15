const Persona = require("../models/persona");
const bodyParser = require("body-parser");
const PersonaRepo = require("../repositories/PersonaRepo");
const Validaciones = require("../controller/Validaciones");
const Respuesta = require("../models/Respuesta");

class PersonasController {
  personaRepo = new PersonaRepo();
  validar = new Validaciones();
  _response = new Respuesta();
  CatchError(res, dato) {
    this._response.displayMessage =
    dato + " invalido: Ocurrio un Error en la Validacion del Campo.";
    this._response.errorMessage = {
      "Nombre": "El nombre no cumple con los parametros o el campo esta vacio",
      "Apellidos":
        "El apellido no cumple con los parametros o el campo esta vacio",
      "Direccion":
        "La direccion no cumple con los parametros o es un campo vacio",
      "Telefono":
        "El numero telefonico no cumple con los parametros o es un campo vacio",
    }[dato];
    res.status(400).json(_response);
  }
  async GetAll(req, res) {
    var result = await this.personaRepo.GetAll(res);
  }
  async GetByName(req, res) {
    const { find } = req.params;
    if (this.validar.nombres(find)) await this.personaRepo.GetByName(res, find);
    else this.CatchError(res, "Nombre");
  }
  async GetByMaterno(req, res) {
    const { find } = req.params;
    if (this.validar.nombres(find))
      await this.personaRepo.GetByMaterno(res, find);
    else this.CatchError(res, "Apellidos");
  }

  async GetByPaterno(req, res) {
    const { find } = req.params;
    if (this.validar.nombres(find))
      await this.personaRepo.GetByPaterno(res, find);
    else this.CatchError(res, "Apellidos");
  }

  
  async Registrar(req, res) {
    const persona = req.body;
     await this.personaRepo.CreateUpdate(res, persona);
      }
  async Actualizar(req, res) {
    const { id } = req.params;
    req.body.id = id; 
    const persona = req.body;
     await this.personaRepo.CreateUpdate(res, persona);
  }
  async Eliminar(req, res) {
    const { id } = req.params;
    if( this.validar.numero(id) && id>0 )
        await this.personaRepo.Delete(res, id);
    else this.CatchError(res,"Nombre");
  }
  validarCampos(res, persona) {
    let resultado = false;
    if (this.validar.nombres(persona.nombre)) resultado = true;
    else {
      this.CatchError(res, "Nombre");
      return false;
    }
    if (this.validar.nombres(persona.apaterno)) resultado = true;
    else {
      this.CatchError(res, "Apellidos");
      return false;
    }
    if (this.validar.nombres(persona.amaterno)) resultado = true;
    else {
      this.CatchError(res, "Apellidos");
      return false;
    }
    if (this.validar.domicilio(persona.domicilio)) resultado = true;
    else {
      this.CatchError(res, "Direccion");
      return false;
    }
    if (this.validar.telefono(persona.telefono)) resultado = true;
    else {
      this.CatchError(res, "Telefono");
      return false;
    }
    return resultado;
  }
}

module.exports = PersonasController;
