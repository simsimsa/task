
export class UsersService {
    private static data: User[] = [];

    public static async initialize(): Promise<void> {
        try {
            const response = await fetch("/userslist.json");
            if (!response.ok) throw new Error("Failed to load users.json");
            this.data = await response.json();
        } catch (error) {
            console.error("Error loading users data:", error);
            this.data = [];
        }
    }

    public static async getUserIds(): Promise<number[]> {
        if (this.data.length === 0) await this.initialize();
        return this.data.map((user) => user.userId);
    }

    public static async getUserById(id: number): Promise<User | undefined> {
        if (this.data.length === 0) await this.initialize();
        return this.data.find((user) => user.userId === id);
    }

    public static async updateUser(updatedUser: User): Promise<boolean> {
        const index = this.data.findIndex(
            (u) => u.userId === updatedUser.userId
        );
        if (index !== -1) {
            this.data[index] = updatedUser;
            return true;
        }
        return false;
    }
}

interface User {
    userId: number;
    name: string;
    department: string;
    company: string;
    jobTitle: string;
}
