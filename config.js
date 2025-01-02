import { connect } from 'mongoose';

export const dbconnect = async () => {
    try {
        await connect("mongodb://127.0.0.1/api-taller");
        console.log("✅ Conexión a la base de datos exitosa");
    } catch (err) {
        console.error("❌ Error al conectar a la base de datos:", err.message);
    }
};
