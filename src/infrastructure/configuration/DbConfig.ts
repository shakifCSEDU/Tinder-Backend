import mongoose from "mongoose";

export class DbConfig {
    static async setupDatabase(): Promise<void> {

        await mongoose.connect(
            "mongodb+srv://sakifsahriar:shakif_24@tinder.oehqocv.mongodb.net/Tinder",
            {
                serverSelectionTimeoutMS: 5000,
            }
        );

    }
}
