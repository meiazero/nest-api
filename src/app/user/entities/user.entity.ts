export class User {
    /**
     *
     * @property {string} id The unique identifier of the user.
     * @property {string} email The email address of the user.
     * @property {string} name The name of the user.
     * @property {string} password The password of the user.
     * @property {Date} createdAt The date the user was created.
     * @property {Date} updateAt The date the user was last updated.
     *
     */
    id?: string
    email: string
    name: string
    password: string
    createdAt?: Date
    updateAt?: Date
}
