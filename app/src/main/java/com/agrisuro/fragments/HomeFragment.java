package com.agrisuro.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.agrisuro.R;
import com.agrisuro.adapters.RecentActivityAdapter;
import com.agrisuro.model.RecentActivity;

import java.util.ArrayList;
import java.util.List;

public class HomeFragment extends Fragment {

    private RecyclerView recentActivityRecyclerView;
    private RecentActivityAdapter recentActivityAdapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_home, container, false);
        
        // Initialize weather dashboard
        View weatherDashboardView = view.findViewById(R.id.weather_dashboard_container);
        
        // Initialize quick access cards
        View encyclopediaCard = view.findViewById(R.id.card_encyclopedia);
        encyclopediaCard.setOnClickListener(v -> {
            // Navigate to Rice Encyclopedia
            getActivity().getSupportFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, new RiceEncyclopediaFragment())
                    .addToBackStack(null)
                    .commit();
        });
        
        View expenseCard = view.findViewById(R.id.card_expense);
        expenseCard.setOnClickListener(v -> {
            // Navigate to Expense Tracker
            getActivity().getSupportFragmentManager().beginTransaction()
                    .replace(R.id.fragment_container, new ExpenseTrackerFragment())
                    .addToBackStack(null)
                    .commit();
        });
        
        // Initialize recent activity
        recentActivityRecyclerView = view.findViewById(R.id.recycler_recent_activity);
        recentActivityRecyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        
        // Set up adapter with mock data
        List<RecentActivity> recentActivities = getMockRecentActivities();
        recentActivityAdapter = new RecentActivityAdapter(recentActivities);
        recentActivityRecyclerView.setAdapter(recentActivityAdapter);
        
        return view;
    }
    
    private List<RecentActivity> getMockRecentActivities() {
        List<RecentActivity> activities = new ArrayList<>();
        
        activities.add(new RecentActivity(
                "Weather Alert",
                "Heavy rainfall expected in the next 48 hours",
                "Today, 10:30 AM",
                RecentActivity.Type.WEATHER
        ));
        
        activities.add(new RecentActivity(
                "Rice Encyclopedia",
                "You viewed information about Brown Spot disease",
                "Yesterday, 3:45 PM",
                RecentActivity.Type.ENCYCLOPEDIA
        ));
        
        activities.add(new RecentActivity(
                "Expense Added",
                "Added ₱1,500 for fertilizer purchase",
                "2 days ago, 9:15 AM",
                RecentActivity.Type.EXPENSE
        ));
        
        return activities;
    }
}
