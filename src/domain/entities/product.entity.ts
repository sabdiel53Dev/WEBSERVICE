export class Product {
    constructor(
        public code: string | null,
        public description: string,
        public category: string,
        public price: number,
        public stock: number,
        public taxable: boolean
    ) {}

    applyDiscount(percent: number) {
        if (percent < 0 || percent > 100) {
            throw new Error("Invalid discount");
        }
        this.price = this.price * (1 - percent / 100);
    }
}