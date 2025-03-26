import { BigJsonLoader } from "./bigJsonLoader";
import { User } from "./types";

export class StreamUsersService {
    public static async getUserIds(): Promise<number[]> {
        const ids: number[] = [];
        for await (const batch of BigJsonLoader.streamUsers("/userslist.json")) {
            ids.push(...batch.map((user) => user.userId));
        }
        return ids;
    }

    public static async *getUsers(): AsyncGenerator<User> {
        for await (const batch of BigJsonLoader.streamUsers(
            "/userslist.json",
            100
        )) {
            for (const user of batch) {
                yield user;
            }
        }
    }
}
