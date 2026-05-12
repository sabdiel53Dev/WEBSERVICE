export class Customer {
    constructor(
        public id: string,
        public name: string,
        public lastname: string,
        public email: string,
        public phone: string,
        public purchaseHistory: String[] = []
    ) {}
}

