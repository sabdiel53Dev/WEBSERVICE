import { CreateCustomerUseCase } from "../../application/use-cases/customer/create-customer.usecase";
import { GetCustomersUseCase } from "../../application/use-cases/customer/get-customers.usecase";
import { GetCustomerByIdUseCase } from "../../application/use-cases/customer/get-customer-by-id.usecase";
import { UpdateCustomerUseCase } from "../../application/use-cases/customer/update-customer.usecase";
import { DeleteCustomerUseCase } from "../../application/use-cases/customer/delete-customer.usecase";

export class CustomerController {
    constructor(
        private readonly createCustomer: CreateCustomerUseCase,
        private readonly getAllCustomers: GetCustomersUseCase,
        private readonly getByIdCustomer: GetCustomerByIdUseCase,
        private readonly updateCustomer: UpdateCustomerUseCase,
        private readonly deleteCustomer: DeleteCustomerUseCase
    ) {}

    async getAll() {
        try {
            return await this.getAllCustomers.execute();
        } catch (error) {
            return this.handleError(error);
        }
    }

    async getById(id: string) {
        try {
            return await this.getByIdCustomer.execute(id);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async create(data: any) {
        try {
            this.validateCreate(data);
            return await this.createCustomer.execute(data);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async update(id: string, data: any) {
        try {
            return await this.updateCustomer.execute(id, data);
        } catch (error) {
            return this.handleError(error);
        }
    }

    async delete(id: string) {
        try {
            return await this.deleteCustomer.execute(id);
        } catch (error) {
            return this.handleError(error);
        }
    }

    private validateCreate(data: any) {

        if (!data.id) throw new Error("Customer ID is required");
        if (!data.name) throw new Error("Name is required");
        if (!data.email) throw new Error("Email is required");

        if (data.purchaseHistory && !Array.isArray(data.purchaseHistory)) {
            throw new Error("Purchase history must be an array of strings");
        }
    }

    private handleError(error: any) {
        console.error(error);
        return {
            success: false,
            message: error.message || "Internal Server Error",
        };
    }
}