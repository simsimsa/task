import { User } from "./types";

export class BigJsonLoader {
    public static async *streamUsers(
        filePath: string,
        batchSize = 1000
    ): AsyncGenerator<User[]> {
        const response = await fetch(filePath);
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let users: User[] = [];

        if (!reader) throw new Error("Failed to read file");

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const parts = buffer.split("\n");
            buffer = parts.pop() || "";

            for (const part of parts) {
                try {
                    if (part.trim() === "[" || part.trim() === "]") continue;
                    const user = JSON.parse(part.replace(/,$/, "")) as User;
                    users.push(user);

                    if (users.length >= batchSize) {
                        yield users;
                        users = [];
                    }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (e) {
                    console.error("Error parsing user:", part);
                }
            }
        }

        if (users.length > 0) {
            yield users;
        }
    }
}
