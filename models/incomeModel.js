const db = require('../config/db');

const Income = {
    // Create
    create: (data, callback) => {
        const query = `
            INSERT INTO income 
            (date, category_id, subcategory_id, variant_id, payer_name, description, amount, payment_mode_id, bill_id, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.date,
            data.category_id || null,
            data.subcategory_id || null,
            data.variant_id || null,
            data.payer_name || null,
            data.description || null,
            data.amount,
            data.payment_mode_id || null,
            data.bill_id || null,
            data.status ?? 1
        ];
        db.query(query, values, callback);
    },

    // Get all with joins
 getAll: (callback) => {
    const query = `
        SELECT 
            i.*,
            mc.category_name,
            sc.sub_category_name,
            v.variant_name,
            pm.payment_method
        FROM income i
        LEFT JOIN main_category mc ON i.category_id = mc.id
        LEFT JOIN sub_category sc ON i.subcategory_id = sc.id
        LEFT JOIN variant v ON i.variant_id = v.id
        LEFT JOIN pay_mode_master pm ON i.payment_mode_id = pm.id
        ORDER BY i.created_at DESC
    `;
    db.query(query, callback);
},


    // Get by ID with joins
    getById: (id, callback) => {
        const query = `
            SELECT 
                i.*,
                mc.category_name,
                sc.subcategory_name,
                v.variant_name,
                pm.payment_mode_name,
                b.bill_code
            FROM income i
            LEFT JOIN main_category mc ON i.category_id = mc.id
            LEFT JOIN subcategory sc ON i.subcategory_id = sc.id
            LEFT JOIN variant v ON i.variant_id = v.id
            LEFT JOIN payment_mode pm ON i.payment_mode_id = pm.id
            LEFT JOIN bill b ON i.bill_id = b.id
            WHERE i.id = ?
        `;
        db.query(query, [id], callback);
    },

    // Update
    updateById: (id, data, callback) => {
        const query = `
            UPDATE income
            SET date=?, category_id=?, subcategory_id=?, variant_id=?, payer_name=?, description=?, amount=?, payment_mode_id=?, bill_id=?, status=?
            WHERE id=?
        `;
        const values = [
            data.date,
            data.category_id || null,
            data.subcategory_id || null,
            data.variant_id || null,
            data.payer_name || null,
            data.description || null,
            data.amount,
            data.payment_mode_id || null,
            data.bill_id || null,
            data.status ?? 1,
            id
        ];
        db.query(query, values, callback);
    },

    // Delete
    deleteById: (id, callback) => {
        const query = `DELETE FROM income WHERE id = ?`;
        db.query(query, [id], callback);
    }
};

module.exports = Income;
