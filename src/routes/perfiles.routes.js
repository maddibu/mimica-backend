const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const ctrl = require("../controllers/perfiles.controller");

router.use(auth);

router.get("/", ctrl.listar);
router.post("/", ctrl.crear);
router.get("/:id", ctrl.obtener);
router.put("/:id", ctrl.actualizar);
router.delete("/:id", ctrl.eliminar);

module.exports = router;
