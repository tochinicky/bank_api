// Creating roles
const Role = require("../models/role");

const createRoles = async (req, res) => {
  try {
    const { rolesData } = req.body;

    for (const roleData of rolesData) {
      const { name, permissions } = roleData;

      const role = await Role.findOne({ name });
      if (role) {
        console.log(`Role "${name}" already exists.`);
      } else {
        const newRole = new Role({ name, permissions });
        await newRole.save();
        console.log(`Role "${name}" created successfully.`);
      }
    }
  } catch (error) {
    console.error("Error creating roles:", error);
  }
};

module.exports = { createRoles };
