const express = require('express');
const router = express.Router();
const contactController= require("../controllers/contactController")
const validateToken= require("../middleware/validateTokenHandler")

router.use(validateToken)
router.route("/").get(contactController.getContacts).post(contactController.createContact);


router.route("/:id").put(contactController.updateContact).get(contactController.getContact);

router.route("/:id").delete(contactController.deleteContact)



module.exports = router;