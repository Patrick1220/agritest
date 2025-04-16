package com.agrisuro.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.agrisuro.R;
import com.agrisuro.model.Expense;
import com.google.android.material.chip.Chip;

import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

public class ExpenseAdapter extends RecyclerView.Adapter<ExpenseAdapter.ExpenseViewHolder> {

    private List<Expense> expenses;

    public ExpenseAdapter(List<Expense> expenses) {
        this.expenses = expenses;
    }

    @NonNull
    @Override
    public ExpenseViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_expense, parent, false);
        return new ExpenseViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ExpenseViewHolder holder, int position) {
        Expense expense = expenses.get(position);
        holder.bind(expense);
    }

    @Override
    public int getItemCount() {
        return expenses.size();
    }

    static class ExpenseViewHolder extends RecyclerView.ViewHolder {
        private TextView dateTextView;
        private Chip categoryChip;
        private TextView descriptionTextView;
        private TextView amountTextView;

        public ExpenseViewHolder(@NonNull View itemView) {
            super(itemView);
            dateTextView = itemView.findViewById(R.id.text_expense_date);
            categoryChip = itemView.findViewById(R.id.chip_expense_category);
            descriptionTextView = itemView.findViewById(R.id.text_expense_description);
            amountTextView = itemView.findViewById(R.id.text_expense_amount);
        }

        public void bind(Expense expense) {
            // Format date
            SimpleDateFormat dateFormat = new SimpleDateFormat("MMM dd, yyyy", Locale.getDefault());
            dateTextView.setText(dateFormat.format(expense.getDate()));

            // Set category
            categoryChip.setText(expense.getCategory());

            // Set description
            descriptionTextView.setText(expense.getDescription());

            // Format amount
            amountTextView.setText(String.format(Locale.getDefault(), "₱%.2f", expense.getAmount()));
        }
    }
}
