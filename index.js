const express = require("express");
const app = express();

const mongoose = require("mongoose");
const uri =
  "mongodb+srv://lhamidabde5:CmwdK7euPSjv5ltd@offers-database.bhkzf.mongodb.net/?retryWrites=true&w=majority&appName=offers-database";

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const Societe = require("./models/Societe");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/salam", (req, res) => {
  res.send("salam");
});

app.post("/salam", (req, res) => {
  res.send("salam");
});

app.get("/find/:number1/:number2", (req, res) => {
  const number1 = req.params.number1;
  const number2 = req.params.number2;
  res.send(`La somme est :${Number(number1) + Number(number2)}`);
});

app.get("/find", (req, res) => {
  const number1 = req.body.number1;
  const number2 = req.body.number2;
  res.send(`La somme est :${Number(number1) + Number(number2)}`);
});

app.get("/findage", (req, res) => {
  const age = req.query.age;
  res.send(`L'age est :${age}`);
});

app.get("/json_res", (req, res) => {
  const name = req.body.name;
  const age = req.body.name;
  res.json({
    //for return by json format
    name: name,
    age: age,
  });
});

app.get("/numberss", (req, res) => {
  let number = [];
  for (let index = 1; index <= 100; index++) {
    number.push(index);
  }

  res.render("societes/view.ejs", {
    name: "Abdelhamid",
    age: 26,
    numbers: number,
  });
});

// ============ Societe endpoint ==========
// ---- start add societe -----
app.post("/societes/add", (req, res) => {
  const newSociete = new Societe({
    nom: req.body.nom,
    adresse: req.body.adresse,
    ice: req.body.ice,
    fixe: req.body.fixe,
    tel: req.body.tel,
    email: req.body.email,
  });

  newSociete
    .save()
    .then((societe) => res.send(`New Societe Created : ${societe}`))
    .catch((err) => res.send(`Error : ${err}`));
});
// ---- end add societe -----

// ---- start index societe -----
app.get("/societes", async (req, res) => {
  const societes = await Societe.find();

  res.json(societes);
});
// ---- end index societe -----

// ---- start find societe ----
app.get("/societes/:id", async (req, res) => {
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" });
    }

    try {
        const societe = await Societe.findById(id);

        if (!societe) {
            return res.status(404).json({ message: "Société non trouvée" });
        }

        res.json(societe);
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
});

// ---- end find societe ----

// --- start delete societe ----
app.delete("/societes/delete/:id",async (req,res)=>{
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" });
    }

    try {
        const societe = await Societe.findByIdAndDelete(id);

        if (!societe) {
            return res.status(404).json({ message: "Société non trouvée" });
        }
        const societes= await Societe.find();
        res.json(societes);
        
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
})
// --- end delete societe ----


// --- start delete societe ----
app.put("/societes/:id",async (req,res)=>{
    const id = req.params.id;

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID invalide" });
    }

    try {
        const updateData = {
            nom: req.body.nom,
            adresse: req.body.adresse,
            ice: req.body.ice,
            fixe: req.body.fixe,
            tel: req.body.tel,
            email: req.body.email
        };
        // hna ln3tiha id o updateData o new: true kt3ni return liya data dyal id modifié
        const societe = await Societe.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!societe) {
            return res.status(404).json({ message: "Société non trouvée" });
        }
        res.json(societe);
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({ message: "Erreur serveur", error: error.message });
    }
})
// --- end update societe ----


// ====== end Societe endpoint =======


app.listen(3000, () => {
  console.log("I'm listening port 3000 ");
});
