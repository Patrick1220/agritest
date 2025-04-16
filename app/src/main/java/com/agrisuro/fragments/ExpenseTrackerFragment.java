package com.agrisuro.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.viewpager2.widget.ViewPager2;

import com.agrisuro.R;
import com.agrisuro.adapters.ExpenseAdapter;
import com.agrisuro.model.Expense;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.tabs.TabLayout;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
 import java.util.List;
import java.util.Locale;

public class ExpenseTrackerFragment extends Fragment {

    private RecyclerView expensesRecyclerView;
    private ExpenseAdapter expenseAdapter;
    private List<Expense> expenses;
    private TextView totalExpensesTextView;
    private TextView highestCategoryTextView;
    private TextView highestCategoryAmountTextView;
    private TextView transactionCountTextView;
    private FloatingActionButton addExpenseFab;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_expense_tracker, container, false);

        // Initialize views
        totalExpensesTextView = view.findViewById(R.id.text_total_expenses);
        highestCategoryTextView = view.findViewById(R.id.text_highest_category);
        highestCategoryAmountTextView = view.findViewById(R.id.text_highest_category_amount);
        transactionCountTextView = view.findViewById(R.id.text_transaction_count);
        expensesRecyclerView = view.findViewById(R.id.recycler_expenses);
        addExpenseFab = view.findViewById(R.id.fab_add_expense);

        // Set up tabs
        TabLayout tabLayout = view.findViewById(R.id.tab_layout_expenses);
        ViewPager2 viewPager = view.findViewById(R.id.view_pager_expenses);
        
        // TODO: Set up ViewPager adapter for tabs

        // Set up expenses recycler view
        expensesRecyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        
        // Load mock expense data
        expenses = getMockExpenses();
        expenseAdapter = new ExpenseAdapter(expenses);
        expensesRecyclerView.setAdapter(expenseAdapter);

        // Update summary cards
        updateSummaryCards();

        // Set up add expense button
        addExpenseFab.setOnClickListener(v -> {
            // TODO: Show add expense dialog
            showAddExpenseDialog();
        });

        return view;
    }

    private void updateSummaryCards() {
        // Calculate total expenses
        double total = 0;
        for (Expense expense : expenses) {
            total += expense.getAmount();
        }

        // Format and display total
        totalExpensesTextView.setText(String.format(Locale.getDefault(), "₱%.2f", total));

        // Find highest category
        String[] categories = {"Seeds", "Fertilizer", "Pesticides", "Labor", "Equipment", "Transportation", "Other"};
        String highestCategory = "None";
        double highestAmount = 0;

        for (String category : categories) {
            double categoryTotal = 0;
            for (Expense expense : expenses) {
                if (expense.getCategory().equals(category)) {
                    categoryTotal += expense.getAmount();
                }
            }

            if (categoryTotal > highestAmount) {
                highestAmount = categoryTotal;
                highestCategory = category;
            }
        }

        // Display highest category
        highestCategoryTextView.setText(highestCategory);
        highestCategoryAmountTextView.setText(String.format(Locale.getDefault(), "₱%.2f", highestAmount));

        // Display transaction count
        transactionCountTextView.setText(String.valueOf(expenses.size()));
    }

    private void showAddExpenseDialog() {
        // TODO: Implement add expense dialog
    }

    private List<Expense> getMockExpenses() {
        List<Expense> expenseList = new ArrayList<>();
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd", Locale.getDefault());

        try {
            expenseList.add(new Expense(
                    "1",
                    dateFormat.parse("2023-06-15"),
                    "Seeds",
                    2500,
                    "Purchased high-yield rice seeds"
            ));

            expenseList.add(new Expense(
                    "2",
                    dateFormat.parse("2023-06-20"),
                    "Fertilizer",
                    3200,
                    "NPK fertilizer for initial application"
            ));

            expenseList.add(new Expense(
                    "3",
                    dateFormat.parse("2023-07-05"),
                    "Labor",
                    5000,
                    "Payment for field preparation and planting"
            ));

            expenseList.add(new Expense(
                    "4",
                    dateFormat.parse("2023-07-15"),
                    "Pesticides",
                    1800,
                    "Insecticide for pest control"
            ));
        } catch (Exception e) {
            e.printStackTrace();
        }

        return expenseList;
    }
}
