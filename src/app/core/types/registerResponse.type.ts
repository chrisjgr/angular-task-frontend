export type RegisterResponse = {
    token: string;
    user: {
        id: string;
        email: string;
        rol: string;
    }
};
