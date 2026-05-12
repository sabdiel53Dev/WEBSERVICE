import { eq } from "drizzle-orm";

import { db } from "../database/connection";
import { customers } from "../database/schema";

import type { CustomerRepository } from "../../domain/repositories/customer.repository";
import type { Customer } from "../../domain/entities/customer.entity";

export class CustomerRepositoryImpl implements CustomerRepository {

    async create(customer: Customer): Promise<Customer> {
        const [result] = await db.insert(customers).values({
            id: customer.id,
            name: customer.name,
            lastname:customer.lastname,
            email: customer.email,
            phone: customer.phone
        });

        return {
            ...customer
        };
    }

    async findAll(): Promise<Customer[]> {
        const result = await db.select().from(customers);

        return result.map(this.toDomain);
    }

    async findById(id: string): Promise<Customer | null> {
        const [result] = await db
            .select()
            .from(customers)
            .where(eq(customers.id, id));

        return result ? this.toDomain(result) : null;
    }

    async update(id: string, data: Partial<Customer>): Promise<Customer> {
        await db
            .update(customers)
            .set({
                name: data.name,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
            })
            .where(eq(customers.id, id));

        const updated = await this.findById(id);

        if (!updated) {
            throw new Error("Customer not found after update");
        }

        return updated;
    }

    async delete(id: string): Promise<void> {
        await db.delete(customers).where(eq(customers.id, id));
    }

    //  Mapper DB → Domain
    private toDomain(row: any): Customer {
        return {
            id: row.id,
            name: row.name,
            lastname: row.lastname,
            email: row.email,
            phone: row.phone,
            purchaseHistory: [], 
        };
    }
}
