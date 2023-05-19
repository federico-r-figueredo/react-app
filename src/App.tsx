import "bootstrap/dist/css/bootstrap.css";
import ExpenseList from "./expense-tracker/components/ExpenseList";
import Container from "./components/Container/Container";
import { useState } from "react";
import ExpenseFilter from "./expense-tracker/components/ExpenseFilter";
import ExpenseForm from "./expense-tracker/components/ExpenseForm";

function App() {
    const [selectedCategory, setSelectedCategory] = useState("");

    const [expenses, setExpenses] = useState([
        { id: 1, description: "aaa", amount: 10, category: "Utilities" },
        { id: 2, description: "bbb", amount: 10, category: "Utilities" },
        { id: 3, description: "ccc", amount: 10, category: "Utilities" },
        { id: 4, description: "ddd", amount: 10, category: "Utilities" }
    ]);

    const visibleExpenses = selectedCategory
        ? expenses.filter((x) => x.category === selectedCategory)
        : expenses;

    return (
        <Container>
            <div className="mb-5">
                <ExpenseForm
                    onSubmit={(newExpense) =>
                        setExpenses([
                            ...expenses,
                            { ...newExpense, id: expenses.length + 1 }
                        ])
                    }
                />
            </div>
            <div className="mb-3">
                <ExpenseFilter
                    onSelectCategory={(category) =>
                        setSelectedCategory(category)
                    }
                />
            </div>
            <ExpenseList
                expenses={visibleExpenses}
                onDelete={(id) =>
                    setExpenses(expenses.filter((expense) => expense.id != id))
                }
            />
        </Container>
    );
}

export default App;
