const db = require('../config/db');

const Expenditure = {
    // Create
    create: (data, callback) => {
        const query = `
            INSERT INTO Expenditure 
            (date, category_id, subcategory_id, variant_id, payee_name, description, amount, payment_mode_id, bill_id, status)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        const values = [
            data.date,
            data.category_id || null,
            data.subcategory_id || null,
            data.variant_id || null,
            data.payee_name || null,
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
                e.*,
                mc.category_name,
                sc.sub_category_name,
                v.variant_name,
                pm.payment_method
            FROM Expenditure e
            LEFT JOIN main_category mc ON e.category_id = mc.id
            LEFT JOIN sub_category sc ON e.subcategory_id = sc.id
            LEFT JOIN variant v ON e.variant_id = v.id
            LEFT JOIN pay_mode_master pm ON e.payment_mode_id = pm.id
            ORDER BY e.created_at DESC
        `;
        db.query(query, callback);
    },

    // Get by ID
    getById: (id, callback) => {
        const query = `
            SELECT 
                e.*,
                mc.category_name,
                sc.sub_category_name,
                v.variant_name,
                pm.payment_method
            FROM Expenditure e
            LEFT JOIN main_category mc ON e.category_id = mc.id
            LEFT JOIN sub_category sc ON e.subcategory_id = sc.id
            LEFT JOIN variant v ON e.variant_id = v.id
            LEFT JOIN pay_mode_master pm ON e.payment_mode_id = pm.id
            WHERE e.id = ?
        `;
        db.query(query, [id], callback);
    },

    // Update
    updateById: (id, data, callback) => {
        const query = `
            UPDATE Expenditure
            SET date=?, category_id=?, subcategory_id=?, variant_id=?, payee_name=?, description=?, amount=?, payment_mode_id=?, bill_id=?, status=?
            WHERE id=?
        `;
        const values = [
            data.date,
            data.category_id || null,
            data.subcategory_id || null,
            data.variant_id || null,
            data.payee_name || null,
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
        const query = `DELETE FROM Expenditure WHERE id = ?`;
        db.query(query, [id], callback);
    }
};

    getReport: (filters, callback) => {
        let query = `
            SELECT 
                e.id,
                e.date,
                e.amount,
                e.payee_name,
                e.description,
                e.bill_id,
                e.status,
                e.created_at,
                mc.category_name,
                sc.sub_category_name,
                v.variant_name,
                pm.payment_method,
                DATE(e.date) as expenditure_date
            FROM Expenditure e
            LEFT JOIN main_category mc ON e.category_id = mc.id
            LEFT JOIN sub_category sc ON e.subcategory_id = sc.id
            LEFT JOIN variant v ON e.variant_id = v.id
            LEFT JOIN pay_mode_master pm ON e.payment_mode_id = pm.id
            WHERE DATE(e.date) BETWEEN ? AND ?
        `;

        const values = [filters.fromDate, filters.toDate];

        // Add optional filters
        if (filters.category_id) {
            query += ` AND e.category_id = ?`;
            values.push(filters.category_id);
        }

        if (filters.payment_mode_id) {
            query += ` AND e.payment_mode_id = ?`;
            values.push(filters.payment_mode_id);
        }

        query += ` ORDER BY e.date DESC, e.created_at DESC`;

        db.query(query, values, callback);
    },

    // Get Report with Category-wise Summary
    getCategorySummary: (filters, callback) => {
        const query = `
            SELECT 
                mc.id as category_id,
                mc.category_name,
                COALESCE(SUM(e.amount), 0) as total_amount,
                COUNT(e.id) as transaction_count
            FROM Expenditure e
            LEFT JOIN main_category mc ON e.category_id = mc.id
            WHERE DATE(e.date) BETWEEN ? AND ?
            GROUP BY mc.id, mc.category_name
            ORDER BY total_amount DESC
        `;
        
        db.query(query, [filters.fromDate, filters.toDate], callback);
    }

module.exports = Expenditure;
