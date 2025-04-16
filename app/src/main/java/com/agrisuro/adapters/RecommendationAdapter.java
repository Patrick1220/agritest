package com.agrisuro.adapters;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.agrisuro.R;
import com.agrisuro.model.Recommendation;
import com.google.android.material.chip.Chip;

import java.util.List;

public class RecommendationAdapter extends RecyclerView.Adapter<RecommendationAdapter.RecommendationViewHolder> {

    private List<Recommendation> recommendations;

    public RecommendationAdapter(List<Recommendation> recommendations) {
        this.recommendations = recommendations;
    }

    @NonNull
    @Override
    public RecommendationViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_recommendation, parent, false);
        return new RecommendationViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull RecommendationViewHolder holder, int position) {
        Recommendation recommendation = recommendations.get(position);
        holder.bind(recommendation);
    }

    @Override
    public int getItemCount() {
        return recommendations.size();
    }

    static class RecommendationViewHolder extends RecyclerView.ViewHolder {
        private TextView titleView;
        private TextView descriptionView;
        private Chip priorityChip;
        private Button saveButton;
        private Button shareButton;

        public RecommendationViewHolder(@NonNull View itemView) {
            super(itemView);
            titleView = itemView.findViewById(R.id.text_recommendation_title);
            descriptionView = itemView.findViewById(R.id.text_recommendation_description);
            priorityChip = itemView.findViewById(R.id.chip_priority);
            saveButton = itemView.findViewById(R.id.button_save);
            shareButton = itemView.findViewById(R.id.button_share);
        }

        public void bind(Recommendation recommendation) {
            titleView.setText(recommendation.getTitle());
            descriptionView.setText(recommendation.getDescription());

            // Set priority chip style and text
            String priorityText = recommendation.getPriority().toString().toLowerCase() + " priority";
            priorityChip.setText(priorityText);

            switch (recommendation.getPriority()) {
                case HIGH:
                    priorityChip.setChipBackgroundColorResource(R.color.priority_high_bg);
                    priorityChip.setTextColor(itemView.getContext().getColor(R.color.priority_high_text));
                    break;
                case MEDIUM:
                    priorityChip.setChipBackgroundColorResource(R.color.priority_medium_bg);
                    priorityChip.setTextColor(itemView.getContext().getColor(R.color.priority_medium_text));
                    break;
                case LOW:
                    priorityChip.setChipBackgroundColorResource(R.color.priority_low_bg);
                    priorityChip.setTextColor(itemView.getContext().getColor(R.color.priority_low_text));
                    break;
            }

            // Set button click listeners
            saveButton.setOnClickListener(v -> {
                // TODO: Implement save functionality
            });

            shareButton.setOnClickListener(v -> {
                // TODO: Implement share functionality
            });
        }
    }
}
