const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/registros.controller");

router.use(auth);

router.get("/", ctrl.listar);
router.get("/:id", ctrl.obtener);
router.post("/", ctrl.crear);

module.exports = router;
