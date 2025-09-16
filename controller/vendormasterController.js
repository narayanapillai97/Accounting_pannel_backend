const vendorMaster = require("../models/vendormastermodel.js");

// Add vendor
exports.addVendor = async (req, res) => {
  try {
    const { vendor_name, mobile_number, email, gst_number, address, payment_terms, status } = req.body;

    if (!vendor_name || !mobile_number || !email) {
      return res.status(400).json({
        success: false,
        message: "vendor_name, mobile_number and email are required."
      });
    }

    vendorMaster.create(
      { vendor_name, mobile_number, email, gst_number, address, payment_terms, status },
      (err, result) => {
        if (err) {
          console.error("Error inserting vendor:", err.sqlMessage || err.message || err);
          return res.status(500).json({
            success: false,
            message: err.sqlMessage || err.message || "Error while adding vendor."
          });
        }
        res.status(201).json({
          success: true,
          message: "Vendor added successfully!",
          vendorId: result.insertId
        });
      }
    );
  } catch (error) {
    console.error("Add Vendor Error:", error);
    res.status(error.status || 500).json({
      error: error.message || "Internal server error"
    });
  }
};

// Get all vendors
exports.getAllVendors = async (req, res) => {
  try {
    vendorMaster.getAll((err, results) => {
      if (err) {
        console.error("Error fetching vendors:", err.sqlMessage || err.message || err);
        return res.status(500).json({
          error: err.sqlMessage || err.message || "Error retrieving vendors."
        });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Get Vendors Error:", error);
    res.status(error.status || 500).json({
      error: error.message || "Internal server error"
    });
  }
};

// Get vendor by ID
exports.getVendorById = async (req, res) => {
  const { id } = req.params;
  try {
    vendorMaster.getById(id, (err, result) => {
      if (err) {
        console.error("Error retrieving vendor:", err.sqlMessage || err.message || err);
        return res.status(500).json({
          error: err.sqlMessage || err.message || "Error retrieving vendor."
        });
      }
      if (result.length === 0) return res.status(404).json({ error: "Vendor not found." });
      res.status(200).json(result[0]);
    });
  } catch (error) {
    console.error("Get Vendor By ID Error:", error);
    res.status(error.status || 500).json({
      error: error.message || "Internal server error"
    });
  }
};

// Update vendor by ID
exports.updateVendorById = async (req, res) => {
  const { id } = req.params;
  try {
    const { vendor_name, mobile_number, email, gst_number, address, payment_terms, status } = req.body;

    if (!vendor_name || !mobile_number || !email) {
      return res.status(400).json({
        error: "vendor_name, mobile_number and email are required."
      });
    }

    vendorMaster.updateById(
      id,
      { vendor_name, mobile_number, email, gst_number, address, payment_terms, status },
      (err, result) => {
        if (err) {
          console.error("Error updating vendor:", err.sqlMessage || err.message || err);
          return res.status(500).json({
            error: err.sqlMessage || err.message || "Error updating vendor."
          });
        }
        if (result.affectedRows === 0) return res.status(404).json({ error: "Vendor not found." });
        res.status(200).json({ message: "Vendor updated successfully." });
      }
    );
  } catch (error) {
    console.error("Update Vendor Error:", error);
    res.status(error.status || 500).json({
      error: error.message || "Internal server error"
    });
  }
};

// Delete vendor
exports.deleteVendorById = async (req, res) => {
  const { id } = req.params;
  try {
    vendorMaster.deleteById(id, (err, result) => {
      if (err) {
        console.error("Error deleting vendor:", err.sqlMessage || err.message || err);
        return res.status(500).json({
          error: err.sqlMessage || err.message || "Error deleting vendor."
        });
      }
      if (result.affectedRows === 0) return res.status(404).json({ error: "Vendor not found." });
      res.status(200).json({ message: "Vendor deleted successfully!" });
    });
  } catch (error) {
    console.error("Delete Vendor Error:", error);
    res.status(error.status || 500).json({
      error: error.message || "Internal server error"
    });
  }
};