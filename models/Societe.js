const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const societeSchema = new Schema({
    nom : {type : String , required:true},
    adresse : {type : String , required:true},
    ice : {type : String , required:true},
    fixe : {type : String , required:true},
    tel : {type : String },
    email : {type : String , required:true,unique: true},
    createdAt: { type: Date, default: Date.now }
});
// hada howa smia dyal table o mnogodb katzid s rassha ghatwali Societes
const Societe = mongoose.model("Societe",societeSchema);  

module.exports = Societe ; 