// Creating permissions
const Permission = require("../models/permissions");
const PermissionData = require("../constants/permissions");

const createPermissions = async () => {
  try {
    for (const permissionData of PermissionData) {
      const { name } = permissionData;

      const permission = await Permission.findOne({ name });
      if (permission) {
        console.log(`Permission "${name}" already exists.`);
      } else {
        const newPermission = new Permission({ name });
        await newPermission.save();
        console.log(`Permission "${name}" created successfully.`);
      }
    }
  } catch (error) {
    console.error("Error creating permissions:", error);
  }
};

module.exports = { createPermissions };
