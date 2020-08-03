class helper{
    static checkIfInfoRensegned(champ, name, obj) {
        if (champ != null && champ != undefined && champ != "") {
          if (obj.status == 400) {
            return false;
          }
          obj.status = 201;
          return true;
        }
        obj.messageError.push(`le chmap ${name} est obligatoir!`);
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
    
}

module.exports = helper