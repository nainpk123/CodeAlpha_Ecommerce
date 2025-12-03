import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/User.js';
import Product from './models/Product.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        // 1. Wipe database clear
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // 2. Insert Users
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id; // Get the Admin ID

        // 3. Add Admin ID to every product (Products must belong to someone)
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });

        // 4. Insert Products
        await Product.insertMany(sampleProducts);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data Destroyed!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}