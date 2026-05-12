import mysql from "mysql2/promise";
import { drizzle } from "drizzle-orm/mysql2";
import { env } from "../../config/env";

//--- 🔌 Pool de conexiones
const pool = mysql.createPool({
    host: env.DB_HOST,
    port: Number(env.DB_PORT) || 3306,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10, //--- numero máximo de conexiones simultaneas
    //--- Número máximo de solicitudes esperando conexión
    queueLimit: 50 
});

//--- Instancia de Drizzle
export const db = drizzle(pool, {
    logger: env.DB_LOGGER ?? (env.NODE_ENV === "development"),
});
//--- (Opcional) exportar pool si necesitas transacciones manuales
export { pool };