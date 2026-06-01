const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const esAdmin = require("../middlewares/rol.middleware");
const ctrl = require("../controllers/usuarios.controller");

router.use(auth);

router.get("/", esAdmin("admin"), ctrl.listar);
router.get("/:id", ctrl.obtener);
router.put("/:id", ctrl.actualizar);
router.delete("/:id", esAdmin("admin"), ctrl.desactivar);

module.exports = router;
