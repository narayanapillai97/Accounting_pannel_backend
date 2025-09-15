const db = require('../config/db');

// Vendor Master Model
const VendorMaster = {
    create: (data, callback) => {
        const query = `
            INSERT INTO vendor_master 
            (vendor_name, mobile_number, email, gst_number, address, payment_terms, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.vendor_name,
            data.mobile_number,
            data.email,
            data.gst_number || null,
            data.address || null,
            data.payment_terms || null,
            data.status !== undefined ? data.status : 1
        ];

        db.query(query, values, callback);
    },

    getAll: (callback) => {
        const query = `SELECT * FROM vendor_master`;
        db.query(query, callback);
    },

    getById: (id, callback) => {
        const query = `SELECT * FROM vendor_master WHERE vendor_id = ?`;
        db.query(query, [id], callback);
    },

    updateById: (id, data, callback) => {
        const query = `
            UPDATE vendor_master 
            SET vendor_name=?, mobile_number=?, email=?, gst_number=?, address=?, payment_terms=?, status=? 
            WHERE vendor_id = ?
        `;
        const values = [
            data.vendor_name,
            data.mobile_number,
            data.email,
            data.gst_number || null,
            data.address || null,
            data.payment_terms || null,
            data.status,
            id
        ];
        db.query(query, values, callback);
    },

    deleteById: (id, callback) => {
        const query = `DELETE FROM vendor_master WHERE vendor_id = ?`;
        db.query(query, [id], callback);
    }
};

module.exports = VendorMaster;
