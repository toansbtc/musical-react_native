import sql from "react-native-sqlite-storage";

const table_Name = `store_song`;
const Collum_path = `path_song`;
const collum_time = `time_play`;

const db = sql.openDatabase(
    {
        name: "song",
        location: "default"
    },
    (sql) => { console.log(`database name ${sql.dbname}`) },
    (error) => { console.log("errorrr ", error.message) }
)

sql.enablePromise(true);

export async function create_DB() {

    try {
        const createTable = `CREATE TABLE IF NOT EXISTS ${table_Name}
         (id INTEGER PRIMARY KEY AUTOINCREMENT,${Collum_path} TEXT , ${collum_time} INTEGER)`;
        db.executeSql(createTable);
        db.close();
        console.log(`create success DB`);
    } catch (error) {
        console.error(error);
        db.close();

    }
}

export async function save_song(song_path: any, time_play: any) {



    const delete_sql = `delete * from ${table_Name}`;
    const insert_sql = `INSERT INTO ${table_Name} (${Collum_path}, ${collum_time}) VALUES (?,?)`;
    const insert_param = [song_path, time_play];
    console.log(`song saved`);

    try {

        db.executeSql(delete_sql);
        db.executeSql(insert_sql, insert_param);
        db.close();
    } catch (error) {
        console.error(error);
        db.close()
    }
}
export async function get_DB_Song() {

    const song: [] = [];
    try {
        const data = await db.executeSql(`select * from ${table_Name}`);
        data.map((item) => { console.log(item.rows.raw()); })
        // data.then((sql) => sql.map((item) => {
        //     console.log(item.rows.item);
        // }));
        console.log(`get song success`);
        db.close();

        return song;
    } catch (error) {
        console.error(error);
        db.close();
    }
}