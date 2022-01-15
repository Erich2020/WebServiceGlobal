const express = require("express");
const bodyParser = require("body-parser");
const personas = require("./controller/PersonasController");
const cors = require('cors');


class App {
  app = new express();
  PORT = process.env.PORT || 3000;
  personasController = new personas();
  api = express.Router();

  configuration() {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(bodyParser.json());
    // Controller
    this.api.get("/personas", async (req, res) =>{await this.personasController.GetAll(req, res)});
    this.api.get("/personas/nombre/:find",  async (req, res) =>{await this.personasController.GetByName(req, res)});
    this.api.get("/personas/paterno/:find",  async (req, res) =>{await this.personasController.GetByPaterno(req, res)});
    this.api.get("/personas/materno/:find",  async (req, res) =>{await this.personasController.GetByMaterno(req, res)});
    this.api.post("/personas",  async (req, res) =>{await this.personasController.Registrar(req, res)});
    this.api.put("/personas/:id",  async (req, res) =>{ await this.personasController.Actualizar(req, res)});
    this.api.delete("/personas/:id", async (req, res) =>{await this.personasController.Eliminar(req, res)});
  }
  // Services
  services() {
    this.app.use(cors());
    // End Points
    this.app.get("/", (req, res) => {
      res.sendFile("index.html", { root: __dirname });
    });

    this.app.use("/api", this.api);
    

  }

  // init
  Run() {
    this.configuration();
    this.services();
    this.app.listen(this.PORT, () => {
      console.log(`Server is running in Port ${this.PORT}`);
    });
  }
}

var app = new App();
app.Run();
