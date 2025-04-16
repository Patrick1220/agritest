package com.agrisuro.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.agrisuro.R;
import com.agrisuro.model.RecentActivity;

import java.util.List;

public class RecentActivityAdapter extends RecyclerView.Adapter<RecentActivityAdapter.ActivityViewHolder> {

    private List<RecentActivity> activities;

    public RecentActivityAdapter(List<RecentActivity> activities) {
        this.activities = activities;
    }

    @NonNull
    @Override
    public ActivityViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_recent_activity, parent, false);
        return new ActivityViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ActivityViewHolder holder, int position) {
        RecentActivity activity = activities.get(position);
        holder.bind(activity);
    }

    @Override
    public int getItemCount() {
        return activities.size();
    }

    static class ActivityViewHolder extends RecyclerView.ViewHolder {
        private ImageView iconView;
        private TextView titleView;
        private TextView descriptionView;
        private TextView timestampView;

        public ActivityViewHolder(@NonNull View itemView) {
            super(itemView);
            iconView = itemView.findViewById(R.id.image_activity_icon);
            titleView = itemView.findViewById(R.id.text_activity_title);
            descriptionView = itemView.findViewById(R.id.text_activity_description);
            timestampView = itemView.findViewById(R.id.text_activity_timestamp);
        }

        public void bind(RecentActivity activity) {
            titleView.setText(activity.getTitle());
            descriptionView.setText(activity.getDescription());
            timestampView.setText(activity.getTimestamp());

            // Set icon based on activity type
            switch (activity.getType()) {
                case WEATHER:
                    iconView.setImageResource(R.drawable.ic_cloud);
                    break;
                case ENCYCLOPEDIA:
                    iconView.setImageResource(R.drawable.ic_book);
                    break;
                case EXPENSE:
                    iconView.setImageResource(R.drawable.ic_money);
                    break;
            }
        }
    }
}
