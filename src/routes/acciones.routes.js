const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const esAdmin = require("../middlewares/rol.middleware");
const ctrl = require("../controllers/acciones.controller");

router.use(auth);

router.get("/", ctrl.listar);
router.get("/:id", ctrl.obtener);
router.post("/", esAdmin("admin"), ctrl.crear);
router.put("/:id", esAdmin("admin"), ctrl.actualizar);
router.delete("/:id", esAdmin("admin"), ctrl.eliminar);

module.exports = router;
