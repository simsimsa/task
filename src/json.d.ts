// json.d.ts
declare module "*.json" {
    const value: Array<{
        userId: number;
        name: string;
        department: string;
        company: string;
        jobTitle: string;
    }>;
    export default value;
}
