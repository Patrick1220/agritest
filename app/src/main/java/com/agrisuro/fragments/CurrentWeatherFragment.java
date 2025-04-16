package com.agrisuro.fragments;

import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.agrisuro.R;
import com.agrisuro.adapters.RecommendationAdapter;
import com.agrisuro.model.Recommendation;
import com.agrisuro.model.WeatherData;

import java.util.ArrayList;
import java.util.List;

public class CurrentWeatherFragment extends Fragment {

    private TextView conditionTextView;
    private ImageView conditionImageView;
    private TextView temperatureTextView;
    private TextView humidityTextView;
    private TextView windTextView;
    private TextView rainfallTextView;
    private RecyclerView recommendationsRecyclerView;
    private RecommendationAdapter recommendationAdapter;

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.layout_current_weather, container, false);

        // Initialize views
        conditionTextView = view.findViewById(R.id.text_weather_condition);
        conditionImageView = view.findViewById(R.id.image_weather_condition);
        temperatureTextView = view.findViewById(R.id.text_temperature);
        humidityTextView = view.findViewById(R.id.text_humidity);
        windTextView = view.findViewById(R.id.text_wind);
        rainfallTextView = view.findViewById(R.id.text_rainfall);
        recommendationsRecyclerView = view.findViewById(R.id.recycler_recommendations);

        // Set up recommendations recycler view
        recommendationsRecyclerView.setLayoutManager(new LinearLayoutManager(getContext()));
        List<Recommendation> recommendations = getMockRecommendations();
        recommendationAdapter = new RecommendationAdapter(recommendations);
        recommendationsRecyclerView.setAdapter(recommendationAdapter);

        // Load mock weather data
        loadMockWeatherData();

        return view;
    }

    private void loadMockWeatherData() {
        // Mock weather data
        WeatherData.Current current = new WeatherData.Current();
        current.setTemperature(32);
        current.setHumidity(75);
        current.setWindSpeed(8);
        current.setCondition("Cloudy");
        current.setRainfall(0.5f);

        // Update UI with weather data
        conditionTextView.setText(current.getCondition());
        temperatureTextView.setText("Temperature: " + current.getTemperature() + "°C");
        humidityTextView.setText("Humidity: " + current.getHumidity() + "%");
        windTextView.setText("Wind: " + current.getWindSpeed() + " km/h");
        rainfallTextView.setText("Rainfall: " + current.getRainfall() + " mm");

        // Set weather icon based on condition
        switch (current.getCondition().toLowerCase()) {
            case "sunny":
                conditionImageView.setImageResource(R.drawable.ic_sun);
                break;
            case "cloudy":
                conditionImageView.setImageResource(R.drawable.ic_cloud);
                break;
            case "rainy":
                conditionImageView.setImageResource(R.drawable.ic_rain);
                break;
            default:
                conditionImageView.setImageResource(R.drawable.ic_cloud);
                break;
        }
    }

    private List<Recommendation> getMockRecommendations() {
        List<Recommendation> recommendations = new ArrayList<>();

        recommendations.add(new Recommendation(
                "1",
                "Irrigation Management",
                "With light rainfall expected today, reduce irrigation to prevent waterlogging. Monitor soil moisture levels closely.",
                Recommendation.Priority.MEDIUM
        ));

        recommendations.add(new Recommendation(
                "2",
                "Pest Control Alert",
                "Current humid conditions are favorable for rice blast disease. Consider preventive fungicide application within the next 48 hours.",
                Recommendation.Priority.HIGH
        ));

        recommendations.add(new Recommendation(
                "3",
                "Fertilizer Application",
                "Sunny conditions tomorrow provide an ideal window for nitrogen fertilizer application. Apply early morning for best results.",
                Recommendation.Priority.MEDIUM
        ));

        return recommendations;
    }
}
