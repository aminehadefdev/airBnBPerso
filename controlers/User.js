class User {
  static async registerHost(req, res) {
    var obj = {
      status: 200,
      massageError: [],
      massageSucces: "",
    };
    User.checkIfInfoRensegned(req.body.firstName, "firstName", obj);
    User.checkIfInfoRensegned(req.body.lastName, "lastName", obj);
    User.checkIfInfoRensegned(req.body.email, "email", obj, req);
    User.checkIfInfoRensegned(req.body.password, "password", obj);
    User.checkIfInfoRensegned(req.body.city, "city", obj, req);
    User.checkIfInfoRensegned(req.body.description, "description", obj);
    User.checkIfInfoRensegned(req.body.birthday, "birthday", obj);

    const REGEX_EMAIL = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const REGEX_NAME = /^(?:[a-zA-Z])+$/;
    const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    const REGEX_BIRTHDAY = /^([0-9]{4})\-([0-9]{2})\-([0-9]{2})$/;

    User.checkIfInfoIsValid(
      REGEX_EMAIL,
      req.body.email,
      obj,
      "email",
      " exemp jhon@do.com"
    );

    User.checkIfInfoIsValid(
      REGEX_NAME,
      req.body.firstName,
      obj,
      "firstName",
      " il ne doit contenir que des lettre "
    );

    User.checkIfInfoIsValid(
      REGEX_NAME,
      req.body.lastName,
      obj,
      "lastName",
      " il ne doit contenir que des lettre "
    );

    User.checkIfInfoIsValid(
      REGEX_PASSWORD,
      req.body.password,
      obj,
      "password",
      " il doit contenir au moins 8 carecteaires dont une majuscule une miniscule un nombre ou chiffre et un carectaire special (/,@^)... que des lettre "
    );

    User.checkIfInfoIsValid(
      REGEX_BIRTHDAY,
      req.body.birthday,
      obj,
      "birthday",
      "je te vois venir petit(e) malin(e)"
    );

    if (obj.status == 201) {
      const bcrypt = require("bcrypt");

      console.log(req.body.password);
      const UX = await User.checkIfUserExist(req.body.email);
      if (UX == false) {
        const bcrypt = require("bcrypt");
        req.body.password = await bcrypt.hashSync(req.body.password, 10);
        console.log(req.password);
        let userModel = require("../models").User;
        const {
          firstName,
          lastName,
          email,
          password,
          city,
          description,
          birthday,
        } = req.body;
        const newUser = await userModel.create({
          firstName,
          lastName,
          email,
          password,
          city,
          description,
          birthday,
          role: "host",
        });
        obj.massageSucces = "inscription reussi";
      } else {
        obj.massageError.push("Cet email est deje enregistrer");
      }
    }
    res.status(obj.status).json(obj);
  }

  static checkIfInfoRensegned(champ, name, obj) {
    if (champ != null && champ != undefined && champ != "") {
      if (obj.status == 400) {
        return false;
      }
      obj.status = 201;
      return true;
    }
    obj.massageError.push(`le chmap ${name} est obligatoir!`);
    obj.status = 400;
    return false;
  }

  static checkIfInfoIsValid(regex, champ, obj, name, regle) {
    if (regex.test(champ)) {
      if (obj.status == 400) {
        return false;
      }
      obj.status = 201;
      return true;
    }
    obj.status = 400;
    obj.massageError.push(`le champ ${name} est incorect ${regle}`);
    return false;
  }

  static async checkIfUserExist(email) {
    let userModel = require("../models").User;
    let userExist = await userModel.findOne({ where: { email: email } });
    if (userExist) {
      return true;
    }
    return false;
  }
}

module.exports = User;
