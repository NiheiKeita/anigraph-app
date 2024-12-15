import { User } from "./user"

export type PageProps = {
    auth?: {
        user: User | null;
    };
};
