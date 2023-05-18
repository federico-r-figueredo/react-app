interface ExpenseFilterProps {
    onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({ onSelectCategory }: ExpenseFilterProps) => {
    return (
        <select
            className="form-select"
            onChange={(event) => onSelectCategory(event.target.value)}
        >
            <option value="">All categories</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entretainment">Entretainment</option>
        </select>
    );
};

export default ExpenseFilter;
