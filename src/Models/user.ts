import mongoose, {Schema, Document} from "mongoose"

export interface expenses extends Document{
    amount: number;
    title: string;
    createdAt: Date;
}

export interface incomeSource extends Document{
    amount : number;
    createdAt: Date;
}

export interface monthlyExpenses extends Document{
    expenseSource: string;
    amount : number;
    createdAt: Date;
}


export interface saveTarget extends Document{
    amount: number;
    createdAt: Date;
}

//wishlist === trips
export interface Wishlist extends Document{
    name: string;
    amount: number;
    createdAt: Date;
    achieveTill: Date;
}


const expensesSchema: Schema<expenses> = new Schema({
    amount:{
        type: Number,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const incomeSourceSchema: Schema<incomeSource> = new Schema({
    amount:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const monthlyExpensesSchema: Schema<monthlyExpenses> = new Schema({
    expenseSource:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const saveTargetSchema: Schema<saveTarget> = new Schema({
    amount:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const wishlistSchema: Schema<Wishlist> = new Schema({
    name:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    achieveTill:{
        type: Date,
        required: true
    }
})

export interface User extends Document{
    username: string;
    email: string;
    password: string;
    wishlist: Wishlist[];
    expenses: expenses[];
    incomeSources: incomeSource[];
    monthlyExpenses: monthlyExpenses[];
    saveTarget: saveTarget[];
    theme: string;
    provider: string
}

const userSchema: Schema<User> = new Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    theme:{
        type: String,
        default: "light"
    },
    provider:{
        type: String,
        required: true
    },
        wishlist: [wishlistSchema],
        expenses: [expensesSchema],
        incomeSources: [incomeSourceSchema],
        monthlyExpenses: [monthlyExpensesSchema],
        saveTarget: [saveTargetSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", userSchema)
export default UserModel;