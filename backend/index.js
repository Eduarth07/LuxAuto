import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import { fileURLToPath } from "url";
import fire from "./init.js";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";

const port = 5050;
const app = express();

app.use(cors());
app.use(fileUpload());
app.use(express.static("files"));
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.json());
app.use(express.static("public"));
const db = getFirestore(fire);
const carsCollection = collection(db, "masini");

app.get("/masini", async (req, res) => {
  try {
    const listamasini = await getDocs(carsCollection);
    const listaNoua = listamasini.docs.map((item) => {
      const masina = item.data();
      masina.id = item.id;
      return masina;
    });
    res.status(200).json(listaNoua);
  } catch (error) {
    console.error("Error getting masini:", error);
    res.status(500).send("Internal Server Error");
  }
});
app.get("/masini/:id", async (req, res) => {
  const id = req.params.id; //  Preiau valoarea parametrului "id"
  const docRef = doc(db, "masini", id); //  docRef este "adresa" articolului cautat
  const document = await getDoc(docRef);
  const masina = document.data(); //  Creez un obiect nou
  res.status(200).send(JSON.stringify(masina));
});

app.post("/adauga", express.json(), async (req, res) => {
  try {
    const car = req.body;
    console.log(car);
    //  Extrag numele fisierului
    const numeFisier = req.files.Imagine.name;

    const fisierPrimit = req.files.Imagine;
    const randomNum = Math.floor(Math.random() * 999999) + 1;
    const numeGenerat = randomNum + "_" + numeFisier;
    const cale = __dirname + "/../public/img/" + numeGenerat; //  Se va edita după generarea versiunii finale!
    fisierPrimit.mv(cale);
    req.body.Imagine = numeGenerat;
    await addDoc(carsCollection, car);
    res.status(201).send("Image uploaded successfully");
  } catch (error) {
    console.error("Error adding car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/sterge/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const carRef = doc(db, "masini", id);
    await deleteDoc(carRef);

    const snapshot = await getDocs(carsCollection);
    const cars = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(cars);
  } catch (error) {
    console.error("Error deleting car:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/editez/:id", express.json(), async (req, res) => {
  const id = req.params.id;

  // Fetch the existing document from the database
  const existingDoc = await getDoc(doc(db, "masini", id));

  if (existingDoc.exists()) {
    // Use the existing name from the database as the default
    const numeFisierVechi = existingDoc.data().Imagine;

    // Check if req.files.Imagine is not null
    const numeFisierNou = req.files?.Imagine
      ? req.files.Imagine.name
      : numeFisierVechi;

    if (numeFisierNou !== numeFisierVechi) {
      // If the filenames are different, proceed with the update

      const fisierPrimit = req.files.Imagine;
      const randomNum = Math.floor(Math.random() * 999999) + 1;
      const numeGenerat = randomNum + "_" + numeFisierNou;
      const cale = __dirname + "/../public/img/" + numeGenerat;
      await fisierPrimit.mv(cale);
      req.body.Imagine = numeGenerat;
    }
  }

  // Always update the "Model" and "Pret" fields
  req.body.Model = req.body.Model || existingDoc.data().Model;
  req.body.Marca = req.body.Marca || existingDoc.data().Marca;
  req.body.An = req.body.An || existingDoc.data().An;
  req.body.Km = req.body.Km || existingDoc.data().Km;
  req.body.Detalii = req.body.Detalii || existingDoc.data().Detalii;
  req.body.Pret = req.body.Pret || existingDoc.data().Pret;

  const docRef = doc(db, "masini", id);
  await updateDoc(docRef, req.body);

  res.status(200).send(JSON.stringify({ mesaj: "Modificare reușita.", id }));
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
