class Account {
    _id: string;
    Role: string;
    Name: string;
    token: string;

    constructor() {
        this._id = '';
        this.Role = '';
        this.Name = '';
        this.token = '';
    }
}

export default Account;
